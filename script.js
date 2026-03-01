const grid = document.getElementById("grid")

let score1 = 0
let score2 = 0

function shuffle(array){
return array.sort(()=>Math.random()-0.5)
}

async function getSongs(artist){

let url = `https://musicbrainz.org/ws/2/recording?query=artist:${artist}&limit=100&fmt=json`

let res = await fetch(url)
let data = await res.json()

let songs = data.recordings.map(r=>r.title)

return songs
}

async function startGame(){

score1=0
score2=0

document.getElementById("score1").innerText=0
document.getElementById("score2").innerText=0

grid.innerHTML=""

let artist1 = document.getElementById("artist1").value
let artist2 = document.getElementById("artist2").value

document.getElementById("name1").innerText=artist1
document.getElementById("name2").innerText=artist2

let songs1 = await getSongs(artist1)
let songs2 = await getSongs(artist2)

songs1 = shuffle(songs1).slice(0,7)
songs2 = shuffle(songs2).slice(0,7)

let boxes = shuffle([
...songs1.map(s=>({artist:1,title:s})),
...songs2.map(s=>({artist:2,title:s}))
])

boxes.forEach(song=>{

let div = document.createElement("div")
div.className="box"
div.innerText="?"

div.onclick=()=>{

if(div.classList.contains("openA") || div.classList.contains("openB")) return

div.innerText=song.title

if(song.artist==1){

div.classList.add("openA")
score1++
document.getElementById("score1").innerText=score1

if(score1==7){
setTimeout(()=>alert("artista 1 venceu"),100)
}

}

else{

div.classList.add("openB")
score2++
document.getElementById("score2").innerText=score2

if(score2==7){
setTimeout(()=>alert("artista 2 venceu"),100)
}

}

}

grid.appendChild(div)

})

}

document.getElementById("start").addEventListener("click", startGame)
