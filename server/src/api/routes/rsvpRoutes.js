import * as rsvp from '../controllers/rsvpController';

export default (app) => {

    // routes
    app.route('/rsvp')
        .post(rsvp.submitRsvp);

}