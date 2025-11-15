import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import ImageIcon from '@mui/icons-material/Image'
import DescriptionIcon from '@mui/icons-material/Description'
import CodeIcon from '@mui/icons-material/Code'
import PeopleIcon from '@mui/icons-material/People'

const DRAWER_WIDTH = 240

const menuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { title: 'Image Enhancement', path: '/image-enhancement', icon: <ImageIcon /> },
  { title: 'Clinical Notes', path: '/clinical-notes', icon: <DescriptionIcon /> },
  { title: 'ICD-10 Coding', path: '/icd10-coding', icon: <CodeIcon /> },
  { title: 'Patient Management', path: '/patients', icon: <PeopleIcon /> }
]

export default function Sidebar({ open }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          mt: 8,
          borderRight: '1px solid rgba(0,0,0,0.1)',
          paddingTop: 0,
        }
      }}
    >
      {/* Top Header Section */}
      <Box
        sx={{
          bgcolor: '#f0f0f0',
          py: 3,
          px: 2,
          textAlign: 'left',
          borderBottom: '1px solid rgba(0,0,0,0.15)'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            lineHeight: '1.4rem'
          }}
        >
          EHR Platform
        </Typography>

        <Typography
          variant="caption"
          sx={{ opacity: 0.6, display: 'block', mt: 0.3 }}
        >
          Medical Suite
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Section */}
      <Box sx={{ px: 2, mt: 2 }}>
        <Typography
          variant="caption"
          sx={{ opacity: 0.6, pl: 1 }}
        >
          MAIN MENU
        </Typography>

        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path

            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 3,
                    py: 1.3,
                    transition: 'all 0.25s ease',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(25,118,210,0.1)',
                      borderLeft: '4px solid #1976d2',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(25,118,210,0.05)',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isSelected ? '#1976d2' : 'inherit',
                      minWidth: 38
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: isSelected ? 600 : 400
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Drawer>
  )
}
