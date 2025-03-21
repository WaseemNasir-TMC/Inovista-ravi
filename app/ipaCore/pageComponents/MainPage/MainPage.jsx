import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Link,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import innivistaBuilding from "../../../public/images/innovista-ravi.webp";
import PackagesMall from "../../../public/icons/PackagesMall.png";
 
const cardData = [
  {
    id: 1,
    title: "Service Tickets",
    image: innivistaBuilding,
    link: "#",
    route: "#/innovista",
  },
  {
    id: 2,
    title: "Immersive City Tour",
    image: PackagesMall,
    link: "#",
    route: "#/",
  },
  //   { id: 3, title: "Mobile Assets", image: "/path/to/floorplan-image.jpg", link: "#", route: "#/mainPage" },
];
 
const CardItem = ({ title, image, link, route }) => {
  const handleCardClick = () => {
    window.location.hash = route.replace("#", "");
  };
 
  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "white",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
          {title}
        </Typography>
        <Link
          component="span" // Changed from href to component="span"
          color="secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#e91e63",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <Typography variant="body1" sx={{ mr: 0.5 }}>
            See More
          </Typography>
          <ArrowForwardIcon fontSize="small" />
        </Link>
      </CardContent>
    </Card>
  );
};
 
function MainPage() {
  return (
    <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#ffffff" }}>
      <Grid container spacing={3}>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <CardItem {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
 
export default MainPage;