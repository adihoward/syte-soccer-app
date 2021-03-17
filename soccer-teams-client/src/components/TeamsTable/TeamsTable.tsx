import React, { useEffect } from 'react'
import { Table, TableRow,  TableBody, TableCell, TableHead } from '@material-ui/core'
import { Team } from '../../types/team.type';
import styles from './TeamsTable.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices/rootReducer';
import { TeamCell } from '../TeamCell/TeamCell';
import { fetchTeams } from '../../slices/teams.slice';

export function TeamsTable() {
    const dispatch = useDispatch();
    const teams = useSelector((state: RootState) => state.teams.teams);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch])

    return (
        <Table className={styles.table}>
            <TableHead className={styles.head}>
                <TableRow>
                    <TableCell />
                    <TableCell> Crest </TableCell>
                    <TableCell> Name </TableCell>
                    <TableCell> Founded </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {teams.map((team: Team, index) =>
                    <TeamCell team={team} key={index} />
                )}
            </TableBody>
        </Table>
    )
}