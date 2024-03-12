const checkNameAndArtist = (req, res, next) => {
    const {name, artist} = req.body
    if (!name){
        res.status(400).json({ error: `Name input ${name} is invalid. A name must not be null.` })
    }else if(!artist){
        res.status(400).json({ error: `Artist input ${artist} is invalid. An artist must not be null.` })
    }else{
        next()
    }
}

const checkBoolean = (req, res, next) => {
    const { is_favorite } = req.body
    if (
      is_favorite == 'true' ||
      is_favorite == 'false' ||
      is_favorite == undefined ||
      typeof is_favorite == 'boolean'
    ) {
      next()
    } else {
      res.status(400).json({ error: 'is_favorite must be a boolean value' })
    }
  }

const checkTime = (req, res, next) =>{
    const {time} = req.body
    const match = /^\d{1,2}:\d{2}$/
    if(!time.match(match)){
        res.status(400).json({ error: `Time must be in proper mm:ss format. ${time} is not in proper format.` })
        console.log(time)
    }else{
        if(req.body.time.charAt(0) === "0"){
            req.body.time = req.body.time.slice(1)
        }
        next()
    }

}
module.exports = { checkBoolean, checkNameAndArtist, checkTime }