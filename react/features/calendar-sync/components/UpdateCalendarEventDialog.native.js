// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConfirmDialog from '../../base/dialog/components/native/ConfirmDialog';
import { translate } from '../../base/i18n';
import { updateCalendarEvent } from '../actions';

type Props = {

    /**
     * The Redux dispatch function.
     */
    dispatch: Function,

    /**
     * The ID of the event to be updated.
     */
    eventId: string
};

/**
 * Component for the add Jitsi link confirm dialog.
 */
class UpdateCalendarEventDialog extends Component<Props> {
    /**
     * Initializes a new {@code UpdateCalendarEventDialog} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onSubmit = this._onSubmit.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <ConfirmDialog
                descriptionKey = 'calendarSync.confirmAddLink'
                onSubmit = { this._onSubmit } />
        );
    }

    _onSubmit: () => boolean;

    /**
     * Callback for the confirm button.
     *
     * @private
     * @returns {boolean} - True (to note that the modal should be closed).
     */
    _onSubmit() {
        this.props.dispatch(updateCalendarEvent(this.props.eventId, ''));

        return true;
    }
}

export default translate(connect()(UpdateCalendarEventDialog));
