export  function getMatchStatusDetails (data,status){
    if(status==='LIVE'){
        return data.matches.filter(match=>((match.status === status) || (match.status ==="INPROGRESS")))
    }
    else{
        return data.matches.filter(match=>match.status === status);
    }
}