import React from 'react'
import { Team } from '../../types/team.type';
import styles from './TeamCell.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { changeFavorite } from '../../slices/teams.slice';
import { useDispatch } from 'react-redux';
import { TableRow, Avatar, TableCell } from '@material-ui/core';

interface TeamCellProps {
    team: Team;
}

export function TeamCell(props: TeamCellProps) {
    const dispatch = useDispatch();

    return (
        <TableRow>
            <TableCell onClick={() => dispatch(changeFavorite(props.team.id))}>
                {props.team.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </TableCell>
            <TableCell>
                <Avatar className={styles.crest} variant="square" alt={props.team.name} src={`data:image/jpeg;base64, ${props.team.crestData}`} />
            </TableCell>
            <TableCell>{props.team.name}</TableCell>
            <TableCell>{props.team.founded}</TableCell>
        </TableRow>
    )
}