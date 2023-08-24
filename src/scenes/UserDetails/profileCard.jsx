
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import moment from 'moment';  // Import moment

const ProfileCard = ({ name, role, createdat, imageUrl, email, address, gender, blockType, accountType, phoneNumber }) => {
    const formattedDate = moment(createdat).format('MMMM Do YYYY');  // Format the date using moment

    return (
        <Card sx={{
            padding: '1%',
            backgroundColor: 'white',
            color: 'black',

            width: '100%',
            maxHeight: '93%',
            boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'stretch',
            borderRadius: '8px',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
            }}>
                <Avatar sx={{
                    backgroundColor: theme => theme.palette.secondary.main,
                    width: theme => theme.spacing(7),
                    height: theme => theme.spacing(7),
                }} src={imageUrl} alt={`${name} Avatar`} />
                <div style={{ flex: 1, marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2" component="div" sx={{ fontSize: '14px' }}>
                        {name}
                    </Typography>
                    <Typography variant="caption" component="div" sx={{ fontSize: '14px', marginBottom: '4px' }}>
                        {email}
                    </Typography>
                </div>
            </div>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'left',
                flexGrow: 1,
            }}>

                <div className="profile-card">
                    <p>{role}</p>
                    <p>details: {gender}</p>
                    <p>Block Type: {blockType}</p>
                    <p>Account Type: {accountType}</p>
                    <p>Creation Date: {formattedDate}</p>
                    
                    <p>Phone Number: {phoneNumber}</p>
                </div>

            </CardContent>
        </Card>
    );
}

export default ProfileCard;
