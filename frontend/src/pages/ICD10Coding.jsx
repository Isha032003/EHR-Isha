import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Paper,
  Chip,
  List,
  ListItem,
  LinearProgress,
  Alert,
} from '@mui/material'
import { toast } from 'react-toastify'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import { icd10Service } from '../services/api'

const themeColors = {
  primaryPeach: '#F7BFA0',
  accentCoral: '#E89A7C',
  lightPeach: '#FAD7C4',
  background: '#FFF7F3',
  textDark: '#4B3A36',
  cardWhite: '#FFFFFF',
}

export default function ICD10Coding() {
  const [clinicalText, setClinicalText] = useState('')
  const [suggestedCodes, setSuggestedCodes] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSuggest = async () => {
    if (!clinicalText.trim()) {
      toast.error('Please enter clinical text')
      return
    }

    setLoading(true)
    try {
      const result = await icd10Service.suggestCodes(clinicalText, 5)
      if (result.success) {
        setSuggestedCodes(result.suggested_codes)
        toast.success(`Found ${result.total_suggestions} ICD-10 code suggestions`)
      }
    } catch (error) {
      console.error('Coding error:', error)
      toast.error(`Error: ${error.response?.data?.error || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'success'
    if (confidence >= 0.6) return 'primary'
    if (confidence >= 0.4) return 'warning'
    return 'error'
  }

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 0.8) return 'High'
    if (confidence >= 0.6) return 'Medium'
    if (confidence >= 0.4) return 'Low'
    return 'Very Low'
  }

  return (
    <Box sx={{ background: themeColors.background, minHeight: '100vh', p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: themeColors.textDark }}>
        ICD-10 Code Suggestion
      </Typography>

      <Grid container spacing={4}>
        {/* Input Section */}
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 10px 28px rgba(75,58,54,0.06)',
              background: themeColors.cardWhite,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: themeColors.textDark }}>
                Clinical Text Input
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={15}
                label="Enter Clinical Documentation"
                value={clinicalText}
                onChange={(e) => setClinicalText(e.target.value)}
                placeholder="Patient presents with persistent hypertension..."
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  background: themeColors.accentCoral,
                  '&:hover': { background: themeColors.primaryPeach },
                }}
                startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                onClick={handleSuggest}
                disabled={loading || !clinicalText.trim()}
              >
                {loading ? 'Analyzing...' : 'Suggest ICD-10 Codes'}
              </Button>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  background: themeColors.lightPeach,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Chip
                  icon={<AutoAwesomeIcon />}
                  label="Amazon Titan GenAI (FREE)"
                  size="small"
                  sx={{ background: themeColors.primaryPeach, color: themeColors.textDark }}
                />
                <Typography variant="caption" color={themeColors.textDark}>
                  AI-powered ICD-10 coding with confidence scores and clinical reasoning
                </Typography>
              </Box>

              {suggestedCodes.length > 0 && (
                <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
                  <Typography variant="caption">
                    <strong>Tip:</strong> Review suggested codes and verify against complete clinical documentation before submitting
                  </Typography>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={7}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 10px 28px rgba(75,58,54,0.06)',
              background: themeColors.cardWhite,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: themeColors.textDark }}>
                Suggested ICD-10 Codes
              </Typography>

              {suggestedCodes.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                  <AutoAwesomeIcon sx={{ fontSize: 64, mb: 2, color: themeColors.accentCoral }} />
                  <Typography>
                    {loading
                      ? 'Analyzing clinical text with AI...'
                      : 'Enter clinical text and click "Suggest ICD-10 Codes"'}
                  </Typography>
                </Box>
              ) : (
                <List>
                  {suggestedCodes.map((code, index) => (
                    <Paper
                      key={index}
                      elevation={1}
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: code.valid ? themeColors.primaryPeach : themeColors.accentCoral,
                        background: code.valid ? themeColors.cardWhite : themeColors.lightPeach,
                      }}
                    >
                      <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                        <Box sx={{ width: '100%' }}>
                          {/* Code Header */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h6" color={themeColors.accentCoral}>
                                {code.code}
                              </Typography>
                              {code.valid ? (
                                <CheckCircleIcon color="success" fontSize="small" />
                              ) : (
                                <WarningIcon color="warning" fontSize="small" />
                              )}
                            </Box>
                            <Chip
                              label={`${getConfidenceLabel(code.confidence)} (${(code.confidence * 100).toFixed(0)}%)`}
                              color={getConfidenceColor(code.confidence)}
                              size="small"
                            />
                          </Box>

                          {/* Description */}
                          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                            {code.description}
                          </Typography>

                          {/* Confidence Bar */}
                          <Box sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="caption" color="text.secondary">
                                Confidence Score
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {(code.confidence * 100).toFixed(1)}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={code.confidence * 100}
                              color={getConfidenceColor(code.confidence)}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>

                          {/* Reasoning */}
                          {code.reasoning && (
                            <Paper elevation={0} sx={{ p: 2, bgcolor: themeColors.lightPeach, mt: 1, borderRadius: 2 }}>
                              <Typography variant="caption" color={themeColors.textDark} sx={{ fontWeight: 600 }}>
                                Clinical Reasoning:
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {code.reasoning}
                              </Typography>
                            </Paper>
                          )}
                        </Box>
                      </ListItem>
                    </Paper>
                  ))}
                </List>
              )}

              {suggestedCodes.length > 0 && (
                <Box sx={{ mt: 2, p: 2, borderRadius: 2, background: themeColors.lightPeach }}>
                  <Typography variant="caption" color={themeColors.accentCoral}>
                    <strong>Disclaimer:</strong> AI-suggested codes should be reviewed by qualified medical coding professionals before submission.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
