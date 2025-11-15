import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Paper,
  Divider,
  Chip,
} from '@mui/material'
import { toast } from 'react-toastify'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'
import { clinicalNotesService } from '../services/api'

const themeColors = {
  primaryPeach: '#F7BFA0',
  accentCoral: '#E89A7C',
  lightPeach: '#FAD7C4',
  background: '#FFF7F3',
  textDark: '#4B3A36',
  cardWhite: '#FFFFFF',
}

export default function ClinicalNotes() {
  const [noteType, setNoteType] = useState('soap')
  const [patientName, setPatientName] = useState('')
  const [patientId, setPatientId] = useState('')
  const [clinicalFindings, setClinicalFindings] = useState('')
  const [generatedNote, setGeneratedNote] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!patientName || !patientId || !clinicalFindings) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const patientInfo = { patient_id: patientId, name: patientName }
      const findings = clinicalFindings.split('\n').filter(f => f.trim())

      let result
      if (noteType === 'soap') {
        result = await clinicalNotesService.generateSOAPNote(patientInfo, findings)
      } else if (noteType === 'discharge') {
        const admissionData = {
          admission_date: '2025-11-01',
          discharge_date: '2025-11-12',
          hospital_course: clinicalFindings,
          procedures: '',
          medications: '',
        }
        result = await clinicalNotesService.generateDischargeSummary(patientInfo, admissionData)
      } else if (noteType === 'radiology') {
        result = await clinicalNotesService.generateRadiologyReport({ findings: clinicalFindings }, 'xray')
      }

      if (result.success) {
        setGeneratedNote(result.content)
        toast.success('Clinical note generated successfully!')
      }
    } catch (error) {
      console.error('Generation error:', error)
      toast.error(`Error: ${error.response?.data?.error || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedNote)
    toast.success('Copied to clipboard!')
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([generatedNote], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `clinical_note_${patientId}_${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Download started!')
  }

  return (
    <Box sx={{ background: themeColors.background, minHeight: '100vh', p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: themeColors.textDark }}>
        Clinical Notes Generation
      </Typography>

      <Grid container spacing={4}>
        {/* Input Section */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 10px 28px rgba(75,58,54,0.06)', background: themeColors.cardWhite }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: themeColors.textDark }}>
                Patient Information
              </Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Note Type</InputLabel>
                <Select value={noteType} label="Note Type" onChange={(e) => setNoteType(e.target.value)}>
                  <MenuItem value="soap">SOAP Note</MenuItem>
                  <MenuItem value="discharge">Discharge Summary</MenuItem>
                  <MenuItem value="radiology">Radiology Report</MenuItem>
                </Select>
              </FormControl>

              <TextField fullWidth label="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} sx={{ mb: 2 }} />

              <TextField
                fullWidth
                multiline
                rows={12}
                label={
                  noteType === 'soap'
                    ? 'Clinical Findings (one per line)'
                    : noteType === 'discharge'
                    ? 'Hospital Course & Procedures'
                    : 'Imaging Findings'
                }
                value={clinicalFindings}
                onChange={(e) => setClinicalFindings(e.target.value)}
                placeholder={
                  noteType === 'soap'
                    ? 'Patient complains of headache\nBP: 140/90 mmHg\nTemp: 98.6°F'
                    : noteType === 'discharge'
                    ? 'Admitted with chest pain...\nTreated with...'
                    : 'Chest X-ray shows...'
                }
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                onClick={handleGenerate}
                disabled={loading}
                sx={{
                  background: `linear-gradient(45deg, ${themeColors.accentCoral} 30%, ${themeColors.primaryPeach} 90%)`,
                  color: themeColors.textDark,
                  fontWeight: 600,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${themeColors.primaryPeach} 30%, ${themeColors.accentCoral} 90%)`,
                  },
                }}
              >
                {loading ? 'Generating...' : 'Generate with AI'}
              </Button>

              <Box sx={{ mt: 3, p: 2, borderRadius: 2, background: themeColors.lightPeach, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip
                  icon={<AutoAwesomeIcon />}
                  label="Amazon Titan GenAI (FREE)"
                  size="small"
                  sx={{ background: themeColors.primaryPeach, color: themeColors.textDark }}
                />
                <Typography variant="caption" color={themeColors.textDark}>
                  Uses Amazon Titan Text Express for professional medical documentation
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Output Section */}
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 10px 28px rgba(75,58,54,0.06)', background: themeColors.cardWhite }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: themeColors.textDark }}>
                  Generated Note
                </Typography>
                {generatedNote && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<ContentCopyIcon />} onClick={handleCopy}>
                      Copy
                    </Button>
                    <Button size="small" startIcon={<DownloadIcon />} onClick={handleDownload} variant="outlined">
                      Download
                    </Button>
                  </Box>
                )}
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  minHeight: 500,
                  backgroundColor: themeColors.lightPeach,
                  border: '1px solid',
                  borderColor: themeColors.accentCoral,
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  overflowY: 'auto',
                }}
              >
                {generatedNote || (
                  <Typography color="textSecondary" align="center" sx={{ mt: 10 }}>
                    {loading ? 'Generating clinical note with AI...' : 'Fill in patient information and click "Generate with AI"'}
                  </Typography>
                )}
                {generatedNote}
              </Paper>

              {generatedNote && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="textSecondary">
                      Generated: {new Date().toLocaleString()}
                    </Typography>
                    <Chip label="AI-Generated" size="small" sx={{ background: themeColors.primaryPeach, color: themeColors.textDark }} />
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
