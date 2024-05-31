const axios = require('axios');
const movies = {
    // "1960": ["Mughal-e-Azam", "Barsaat Ki Raat", "Kohinoor", "Chaudhvin Ka Chand", "Jis Desh Mein Ganga Behti Hai", "Dil Apna Aur Preet Parayi", "Love in Simla", "Ghunghat", "Kanoon", "Kala Bazar", "Chhalia", "Hum Hindustani"],
    // "1961": ["Gunga Jumna", "Junglee", "Gharana", "Aas Ka Panchhi", "Jab Pyar Kisi Se Hota Hai", "Sasural", "Hum Dono", "Kabuliwala", "Zindagi aur Khwab", "Shola Aur Shabnam", "Jhumroo", "Nazrana", "Pyar Ka Saagar", "Maya", "Chhaya", "Roop Ki Rani Choron Ka Raja", "Reshmi Rumal", "Piya Milan Ki Aas", "Chote Nawab", "Boy Friend"]
    // "1962": ["Bees Saal Baad","Ek Musafir Ek Haseena", "Professor", "Hariyali Aur Raasta", "Asli-Naqli", "Dil Tera Diwana", "Anpadh", "	Aarti", "China Town", "Sangeet Samrat Tansen", "Son of India", "Half Ticket", "Main Chup Rahungi"]
    // "1963": ["Mere Mehboob", "Taj Mahal", "Phir Wohi Dil Laya Hoon", "Gumrah", "Dil Ek Mandir", "Tere Ghar Ke Samne", "Shikari", "Mujhe Jeene Do", "Gehra Daag", "Bandini"]
    "1964": ["Sangam", "Ayee Milan Ki Bela", "Dosti", "Ziddi", "Rajkumar", "Kashmir Ki Kali", "Haqeeqat", "Zindagi", "Woh Kaun Thi", "April Fool", "Leader", "Beti Bete", "Samson", "Dulha Dulhan", "Door Ki Awaaz"]
}
async function getData() {
    let years = Object.keys(movies);
    for (let year of years) {
        for (let movie of movies[year]) {
            try{
            let res = await axios.get(`http://127.0.0.1:5100/result/?query=${movie} ${year}`)
            let res2 = await axios.get(`http://127.0.0.1:5100/result/?query=${res.data[0]['album_url']}`)
            populateData(res2.data);
            }
            catch(err){
                console.error(err);
            }
        }
    }
}
var mainData = [];
function populateData(jsonData) {
    let masterData = {
        "movie": jsonData['title'],
        "release_date": jsonData['release_date'],
        "year": jsonData['year'],
        "image": jsonData['image'],
        "songs": []
    }

    for (let song of jsonData['songs']) {
        let obj = {
            "song": song['song'],
            "music": song['music'],
            "singers": song['singers'],
            "lyrics": Object.keys(song['artistMap'])
        }
        masterData.songs.push(obj);
    }
    mainData.push(masterData);
    console.log(JSON.stringify(masterData, null,2))
    console.log(",")
}

getData();
console.log(JSON.stringify(mainData, null, 2));