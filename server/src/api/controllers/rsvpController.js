import axios from 'axios';
import CircularJSON from 'circular-json';

const getRsvp = async (phone) => {
    let oldRsvp = await axios.get(`http://localhost:5984/rsvp/${phone}`)
        .then((response) => {
            return CircularJSON.stringify(response).data;
        })
        .catch((error) => {
            return null;
        });
   
    return oldRsvp;
}

export const submitRsvp = async (req, res) => {
    let rsvp = req.body;
    let oldRsvp = await getRsvp(rsvp.phone);

    if(oldRsvp === null){
        await axios.post("http://localhost:5984/rsvp", {
        "name": rsvp.name,
        "phone": rsvp.phone,
        "email": rsvp.email,
        "isComing": rsvp.isComing,
        "msg": rsvp.msg,
        "_id": rsvp.phone,
        "lastSaved": new Date().toString()
    }).then((response) => {
            res.json(CircularJSON.stringify(response).data);
        })
        .catch((error) => {
            res.send(CircularJSON.stringify(error));
        })
       
    } else {
        await axios.put(`http://localhost:5984/rsvp/${rsvp.phone}`, {
        "name": rsvp.name,
        "phone": rsvp.phone,
        "email": rsvp.email,
        "isComing": rsvp.isComing,
        "msg": rsvp.msg,
        "_id": rsvp.phone,
        "_rev": oldRsvp._rev,
        "lastSaved": new Date().toString()
    })
        .then((response) => {
            res.json(CircularJSON.stringify(response).data);
        })
        .catch((error) => {
            res.send(CircularJSON.stringify(error));
        })
    }    
    console.log('done!!!');
}

