import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getActivityDetail } from '../services/api';
import { Box, Card, CardContent, Divider, Typography, Button, CircularProgress, Alert } from '@mui/material';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getActivityDetail(id);
        setRecommendation(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load activity recommendation. The AI recommendation may not be ready yet.');
      } finally {
        setLoading(false);
      }
    }

    fetchActivityDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>
        <Button variant="outlined" onClick={() => navigate('/activities')}>
          Back to Activities
        </Button>
      </Box>
    );
  }

  if (!recommendation) {
    return <Typography>No recommendation found.</Typography>
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Button variant="outlined" onClick={() => navigate('/activities')} sx={{ mb: 2 }}>
              ← Back to Activities
            </Button>

            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Activity Details</Typography>
                    <Typography>Type: {recommendation.activityType}</Typography>
                    <Typography>Activity ID: {recommendation.activityId}</Typography>
                    <Typography>Date: {recommendation.createdAt ? new Date(recommendation.createdAt).toLocaleString() : 'N/A'}</Typography>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>AI Recommendation</Typography>
                    <Typography variant="h6">Analysis</Typography>
                    <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>{recommendation.recommendation}</Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="h6">Improvements</Typography>
                    {recommendation?.improvements?.map((improvement, index) => (
                        <Typography key={index} paragraph>• {improvement}</Typography>
                    ))}
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="h6">Suggestions</Typography>
                    {recommendation?.suggestions?.map((suggestion, index) => (
                        <Typography key={index} paragraph>• {suggestion}</Typography>
                    ))}
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="h6">Safety Guidelines</Typography>
                    {recommendation?.safety?.map((safety, index) => (
                        <Typography key={index} paragraph>• {safety}</Typography>
                    ))}
                </CardContent>
            </Card>
        </Box>
  )
}

export default ActivityDetail