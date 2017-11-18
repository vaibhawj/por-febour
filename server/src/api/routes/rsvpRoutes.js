import * as rsvp from '../controllers/rsvpController';

export default (app) => {

    // routes
    app.route('/saveRsvp')
        .post(rsvp.submitRsvp);

}