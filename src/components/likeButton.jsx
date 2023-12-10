import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink, grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

export function LikeButton(props) {
    const { id, user, liked, changeLiked } = props;
    const [isLiked, setIsLiked] = React.useState(liked)

    React.useEffect(() => setIsLiked(props.liked), [props.liked])

    const handleClick = () => {
        console.log(user, id)
        if (!isLiked) {
            axios.post('/api/addUserToEvent', { user: user, event: id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            axios.post('/api/removeUserToEvent', { user: user, event: id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(err => {
                console.log(err)
            })
        }
        setIsLiked(!isLiked)
        changeLiked(id)
    }
    return (
        <div className='likeButton'>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <IconButton aria-label="like" onClick={handleClick} title='like'>
                    <FavoriteIcon sx={{ color: (isLiked ? pink[500] : grey[500]) }} />
                </IconButton>
            </Box>
        </div>
    );
}