import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { openDialog } from '../../../base/dialog/actions';
import { IconUsers } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';
import { getParticipantCount } from '../../../base/participants/functions';
import { SpeakerStats } from '../../../speaker-stats';
import { isSpeakerStatsDisabled } from '../../../speaker-stats/functions';
import { iAmVisitor } from '../../../visitors/functions';

/**
 * ParticipantsCount react component.
 * Displays the number of participants and opens Speaker stats on click.
 *
 * @class ParticipantsCount
 */
function SpeakerStatsLabel() {
    const conference = useSelector((state: IReduxState) => state['features/base/conference'].conference);
    let count = useSelector(getParticipantCount);
    const iAmVisitorState = useSelector(iAmVisitor);
    const _isSpeakerStatsDisabled = useSelector(isSpeakerStatsDisabled);
    const dispatch = useDispatch();

    // visitor has hidden its own video and should not count itself
    if (iAmVisitorState) {
        count--;
    }

    const onClick = () => {
        dispatch(openDialog(SpeakerStats, { conference }));
    };

    if (count <= 2 || _isSpeakerStatsDisabled) {
        return null;
    }

    return (
        <Label
            color = { COLORS.white }
            icon = { IconUsers }
            iconColor = '#fff'
            // eslint-disable-next-line react/jsx-no-bind
            onClick = { onClick }
            text = { `${count}` } />
    );
}

export default SpeakerStatsLabel;
