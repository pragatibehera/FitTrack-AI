import { Alert, Box, Card, CardContent, CircularProgress, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to load activities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  if (activities.length === 0) {
    return (
      <Typography sx={{ mt: 2, textAlign: 'center' }} color="text.secondary">
        No activities yet. Add your first activity above!
      </Typography>
    );
  }

  return (
    <Grid2 container spacing={2}>
      {activities.map((activity) => (
        <Grid2 key={activity.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{cursor: 'pointer', '&:hover': { boxShadow: 6 }, transition: 'box-shadow 0.3s' }}
            onClick= {() => navigate(`/activities/${activity.id}`)}>
                <CardContent>
                  <Typography variant='h6'>{activity.type}</Typography>
                  <Typography>Duration: {activity.duration} min</Typography>
                  <Typography>Calories: {activity.caloriesBurned}</Typography>
                  {activity.createdAt && (
                    <Typography variant="body2" color="text.secondary">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
            </Card>
        </Grid2>
      ))}
  </Grid2>
  )
}

export default ActivityList