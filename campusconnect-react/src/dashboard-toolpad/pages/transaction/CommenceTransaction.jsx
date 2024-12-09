import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {PageContainer} from "@toolpad/core/PageContainer";

const CommenceTransaction = () => {
    return (
        <PageContainer>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Card sx={{ maxWidth: 800 }}>
                    <CardMedia
                        sx={{ height: 150 }}
                        image="https://static.wikia.nocookie.net/smallsoldiers/images/a/ac/1c331f0a4e0b2e94be04bc7500a98cda.jpg/revision/latest?cb=20170613024209"
                        title="green iguana"

                    />
                    <CardContent sx={{ textAlign: 'left' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Button variant="contained" size="small" sx={{ backgroundColor: 'green', color: 'white' }}>
                                Go with the Transaction
                            </Button>
                            <Button variant="contained" size="small" sx={{ backgroundColor: 'red', color: 'white' }}>
                                Cancel Transaction
                            </Button>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </PageContainer>
    );
}
export default CommenceTransaction;