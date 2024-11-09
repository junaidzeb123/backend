import React from 'react';
import { Grid, Typography, Button, Box, CardMedia } from '@mui/material';
import { Card } from 'react-bootstrap';
import homepic from "../assets/homePage.png"

function HomePage() {
  return (
    <Box display="flex">
      <Grid container spacing={2} sx={{ height: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h1" gutterBottom>
              Welcome to My Website
            </Typography>

            <Box>
              <Typography>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore ipsa ipsam sint veritatis sunt animi ea, sapiente unde! Vitae, tempore.
              </Typography>
            </Box>

            <Button
              sx={{
                background: 'linear-gradient(445deg, #FF5733 30%, #FFC300 90%)',
                color: 'white',
                padding: "20px",
                borderRadius: "20px"
              }}
            >
              Start Chatting Now
            </Button>

          </Box>

        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ width: "400px", height: "400px", background: 'linear-gradient(445deg, #FF5733 30%, #FFC300 90%)', borderRadius: "50%", position: "absolute", top: "200px", right : " 115px", zIndex : -1 , }}>

          </Box>
          <CardMedia
            component="img"
            image={homepic}
            alt="Home Image"
            sx={{ minHeight: "100%" }}
          />
        </Box>
      </Grid>
    </Grid>
    </Box >


  );
}

export default HomePage;
