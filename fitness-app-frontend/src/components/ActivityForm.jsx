import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../services/api'


const ActivityForm = ({ onActivityAdded }) => {

    const [activity, setActivity] = useState({
        type: "RUNNING", duration: '', caloriesBurned: '',
        additionalMetrics: {}
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!activity.duration || !activity.caloriesBurned) {
            setSnackbar({ open: true, message: 'Please fill in all required fields', severity: 'warning' });
            return;
        }
        try {
            setLoading(true);
            await addActivity({
                ...activity,
                duration: parseInt(activity.duration),
                caloriesBurned: parseInt(activity.caloriesBurned)
            });
            setSnackbar({ open: true, message: 'Activity added successfully!', severity: 'success' });
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: '', additionalMetrics: {} });
            if (onActivityAdded) onActivityAdded();
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: 'Failed to add activity. Please try again.', severity: 'error' });
        } finally {
            setLoading(false);
        }
    }
    
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
    <FormControl fullWidth sx={{mb: 2}}>
        <InputLabel>Activity Type</InputLabel>
        <Select
            value={activity.type}
            label="Activity Type"
            onChange={(e) => setActivity({...activity, type: e.target.value})}>
                <MenuItem value="RUNNING">Running</MenuItem>
                <MenuItem value="WALKING">Walking</MenuItem>
                <MenuItem value="CYCLING">Cycling</MenuItem>
                <MenuItem value="SWIMMING">Swimming</MenuItem>
                <MenuItem value="WEIGHT_TRAINING">Weight Training</MenuItem>
                <MenuItem value="YOGA">Yoga</MenuItem>
                <MenuItem value="HIIT">HIIT</MenuItem>
                <MenuItem value="CARDIO">Cardio</MenuItem>
                <MenuItem value="STRETCHING">Stretching</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
            </Select>
    </FormControl>
    <TextField fullWidth
                label="Duration (Minutes)"
                type='number'
                required
                sx={{ mb: 2}}
                value={activity.duration}
                inputProps={{ min: 1 }}
                onChange={(e) => setActivity({...activity, duration: e.target.value})}/>

    <TextField fullWidth
                label="Calories Burned"
                type='number'
                required
                sx={{ mb: 2}}
                value={activity.caloriesBurned}
                inputProps={{ min: 0 }}
                onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}/>

    <Button type='submit' variant='contained' disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Add Activity'}
    </Button>

    <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
        </Alert>
    </Snackbar>
  </Box>
  )
}

export default ActivityForm