const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');
// Gets All Members
router.get('/',(req,res) => {
    res.json(members)
})

//Get single Member
router.get('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else {
        res.status(400).json({msg: `No memeber with the id of ${req.params.id}`})
    }
   
});

// create Member
router.post('/',(req,res)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:'Please include a name an d mail'})
    }

    members.push(newMember);
    res.json(members);
    //res.redirect('/');

});
// update memeber 

router.put('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
       const updMember = req.body;
       members.forEach(member => {
           if(member.id === parseInt(req.params.id)){
               member.name = updMember.name ? updMember.name: member.name;
               member.email = updMember.email ? updMember.email: member.email;
            
                res.json({ms: 'membr update', member})
            }
       });
    }else {
        res.status(400).json({msg: `No memeber with the id of ${req.params.id}`})
    }
   
});

//delet

router.delete('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json({msg:'Member deleted',members: members.filter(member => member.id !== parseInt(req.params.id))});
    }else {
        res.status(400).json({msg: `No memeber with the id of ${req.params.id}`})
    }
   
});

module.exports = router;