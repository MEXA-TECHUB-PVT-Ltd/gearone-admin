
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';  // Import moment

const ProfileCard = ({ name, role, createdat, imageUrl, email, address, gender, blockType, accountType, phoneNumber }) => {
    const formattedDate = moment(createdat).format('MMMM Do YYYY');  // Format the date using moment
    const [BlockStatus, setBlockStatus] = React.useState(blockType);

    useEffect(() => {
        setBlockStatus(blockType)
    }, [blockType])

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
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Order By</span>

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
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: '600', fontSize: '16px' }}>
                        {name}
                    </Typography>
                    <Typography variant="caption" component="div" sx={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
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
                <span style={{ fontSize: '16px', fontWeight: '600' }}>{role}</span>
                    {/* <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Details:</span> {gender}</p> */}
                    {/* <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Status:</span> {BlockStatus}</p> */}
                    {/* <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Account Type:</span> {accountType}</p> */}
                    {/* <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Creation Date:</span> {formattedDate}</p> */}
                    <p style={{ fontWeight: '600', fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}><span>Phone Number:</span> {phoneNumber}</p>
                </div>

            </CardContent>
        </Card>
    );
}

export default ProfileCard;
