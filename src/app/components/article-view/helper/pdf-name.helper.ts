export const pdfName = ()=> {

    let currentDate =  new Date();
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth()).toLocaleString('en-Us', {minimumIntegerDigits:2});
    let day = (currentDate.getDate()).toLocaleString('en-Us', {minimumIntegerDigits:2});

    let hours=currentDate.getHours();
    let minutes=currentDate.getMinutes();
    let seconds=currentDate.getSeconds();

    let downladedTime = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

    
    let result = `${downladedTime}`
    
    return result;

}