import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogPostCard = ({ post }: { post: any }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "300px", // Kártya szélessége
        height: "250px", // Kártya magassága
        backgroundColor: "#ffffff", // Fehér háttér
        borderRadius: "16px", // Lekerekített sarkok
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Árnyék
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Hover animáció
        "&:hover": {
          transform: "scale(1.05)", // Hover állapotban nagyítás
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)", // Erősebb árnyék hover állapotban
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            color: "#1a2b6d", // Sötétkék betűszín
            fontWeight: 600,
            marginBottom: "4px",
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#4b9fe1", // Világoskék betűszín
            marginBottom: "16px",
          }}
        >
          {post.author} - {new Date(post.dateCreated).toLocaleDateString()}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#1a2b6d", // Sötétkék betűszín
            marginBottom: "8px",
            display: "-webkit-box", // Többsoros szöveg támogatása
            WebkitLineClamp: 3, // Maximum 3 sor
            WebkitBoxOrient: "vertical", // Többsoros szöveg orientációja
            overflow: "hidden", // Szöveg túlcsordulásának elrejtése
            textOverflow: "ellipsis",
          }}
        >
          {post.content}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", marginTop: "19px" }}>
        <Button
          size="small"
          onClick={() => navigate(`/blogpost/${post.id}`)}
          sx={{
            backgroundColor: "#1a2b6d", // Sötétkék háttér
            color: "#ffffff", // Fehér betűszín
            textTransform: "none", // Ne legyen nagybetűs
            borderRadius: "8px", // Lekerekített sarkok
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#4b9fe1", // Világoskék hover állapotban
            },
          }}
        >
          More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogPostCard;