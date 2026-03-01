const grid = document.getElementById("grid")

let score1 = 0
let score2 = 0

function shuffle(array){
return array.sort(()=>Math.random()-0.5)
}

async function getArtistData(name){

let artistRes = await fetch(
`https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(name)}&fmt=json`
)

let artistData = await artistRes.json()

let artist = artistData.artists[0]

return artist
}

async function getSongs(name){

let res = await fetch(
`https://musicbrainz.org/ws/2/recording?query=artist:${encodeURIComponent(name)}&limit=100&fmt=json`
)

let data = await res.json()

return data.recordings.map(r=>r.title)
}

async function getImage(mbid){

return `https://coverartarchive.org/artist/${mbid}/front`
}

async function startGame(){

grid.innerHTML=""

score1=0
score2=0

document.getElementById("score1").innerText=0
document.getElementById("score2").innerText=0

let a1 = document.getElementById("artist1").value
let a2 = document.getElementById("artist2").value

document.getElementById("name1").innerText=a1
document.getElementById("name2").innerText=a2

let artist1 = await getArtistData(a1)
let artist2 = await getArtistData(a2)

document.getElementById("img1").src = await getImage(artist1.id)
document.getElementById("img2").src = await getImage(artist2.id)

let songs1 = shuffle(await getSongs(a1)).slice(0,7)
let songs2 = shuffle(await getSongs(a2)).slice(0,7)

let boxes = shuffle([
...songs1.map(s=>({artist:1,title:s})),
...songs2.map(s=>({artist:2,title:s}))
])

boxes.forEach(song=>{

let box = document.createElement("div")
box.className="box"
box.innerText="?"

box.onclick=()=>{

if(box.classList.contains("openA") || box.classList.contains("openB")) return

box.innerText=song.title

if(song.artist==1){

box.classList.add("openA")
score1++
document.getElementById("score1").innerText=score1

if(score1==7){
setTimeout(()=>alert("artista 1 venceu"),150)
}

}

else{

box.classList.add("openB")
score2++
document.getElementById("score2").innerText=score2

if(score2==7){
setTimeout(()=>alert("artista 2 venceu"),150)
}

}

}

grid.appendChild(box)

})

}

document.getElementById("start").addEventListener("click", startGame)
