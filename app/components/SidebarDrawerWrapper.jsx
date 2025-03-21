import React, { useState } from 'react';
import { 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Collapse
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ConfirmationNumber as TicketIcon,
  ViewInAr as AssetTwinIcon,
  LocationCity as CityTourIcon,
  LocationOn as MobileAssetTrackingIcon,
  ChevronRight as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

// Constants
const EXPANDED_WIDTH = 280;
const COLLAPSED_WIDTH = 48;

const TwinitSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Using an array to track multiple open items
  const [openItems, setOpenItems] = useState([]);

  // Each item now includes subItems for the dropdown.
  const menuItems = [
    { 
      id: 'tickets', 
      text: 'Tickets', 
      icon: <TicketIcon />,
      subItems: [
        { id: 'ticket1', text: 'Ticket Option 1' },
        { id: 'ticket2', text: 'Ticket Option 2' }
      ]
    },
    { 
      id: 'assetTwin', 
      text: 'Asset Twin', 
      icon: <AssetTwinIcon />,
      subItems: [
        { id: 'asset1', text: 'Asset Option 1' },
        { id: 'asset2', text: 'Asset Option 2' }
      ]
    },
    { 
      id: 'cityTour', 
      text: 'City Tour', 
      icon: <CityTourIcon />,
      subItems: [
        { id: 'tour1', text: 'Tour Option 1' },
        { id: 'tour2', text: 'Tour Option 2' }
      ]
    },
    { 
      id: 'mobileAssetTracking', 
      text: 'Mobile Asset Tracking', 
      icon: <MobileAssetTrackingIcon />,
      subItems: [
        { id: 'mobile1', text: 'Tracking Option 1' },
        { id: 'mobile2', text: 'Tracking Option 2' }
      ]
    }
  ];

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggle individual menu item. Add it to openItems if not already open, otherwise remove it.
  const toggleMenuItem = (itemId) => {
    if (openItems.includes(itemId)) {
      setOpenItems(openItems.filter(id => id !== itemId));
    } else {
      setOpenItems([...openItems, itemId]);
    }
  };

  const renderMenuItems = () => (
    <List sx={{ padding: 0 }}>
      {menuItems.map((item) => (
        <Box key={item.id}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => toggleMenuItem(item.id)}
              sx={{
                minHeight: 48,
                px: 2.5,
                justifyContent: isExpanded ? 'initial' : 'center',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isExpanded ? 2 : 0,
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isExpanded && (
                <>
                  <ListItemText 
                    primary={item.text} 
                    sx={{
                      opacity: 1,
                      '& .MuiListItemText-primary': {
                        color: 'white',
                        fontWeight: 400
                      }
                    }}
                  />
                  {openItems.includes(item.id) ? (
                    <ExpandLessIcon sx={{ color: 'white' }} />
                  ) : (
                    <ExpandMoreIcon sx={{ color: 'white' }} />
                  )}
                </>
              )}
            </ListItemButton>
          </ListItem>
          {isExpanded && (
            <Collapse in={openItems.includes(item.id)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subItems.map((subItem) => (
                  <ListItem key={subItem.id} disablePadding sx={{ pl: 4 }}>
                    <ListItemButton
                      sx={{
                        minHeight: 40,
                        px: 2.5,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      <ListItemText 
                        primary={subItem.text} 
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: 'white',
                            fontWeight: 300
                          }
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </Box>
      ))}
    </List>
  );

  const renderHeader = () => {
    if (!isExpanded) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            p: 1.5,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
            <MenuIcon />
          </IconButton>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
          backgroundColor: '#121212',
          color: 'white',
          border: 'none',
          transition: 'width 0.2s ease-in-out',
          overflowX: 'hidden'
        },
      }}
    >
      {renderHeader()}
      {renderMenuItems()}
    </Drawer>
  );
};

// Main component
const AppWithSidebar = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <TwinitSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f5f5f5'
        }}
      >
        {/* Main content goes here */}
        <Typography paragraph>
          Main content area
        </Typography>
      </Box>
    </Box>
  );
};

export default AppWithSidebar;
