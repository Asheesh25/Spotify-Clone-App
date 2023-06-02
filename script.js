
// Initialize the variables
let songIndex = 0; //Tells which dong plays, 0=1st song and so on
let audioElement = new Audio("./songs/1.mp3");
audioElement.id=0;
let masterPlay = document.getElementById('masterPlay'); //Play-pause button
let myProgressBar = document.getElementById('myProgressBar') // How much song has yet played, range element
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

// Array of objects below. 
let songs = [
    {songName:"Te Amo", filePath:"./songs/1.mp3", coverPath:"./covers/1.jpg"},
    {songName:"Bekhayali", filePath:"./songs/2.mp3", coverPath:"./covers/2.jpg"},
    {songName:"Kaho na kaho", filePath:"./songs/3.mp3", coverPath:"./covers/3.jpg"},
    {songName:"Hale Dil", filePath:"./songs/4.mp3", coverPath:"./covers/4.jpg"},
    {songName:"Khuda Jaane", filePath:"./songs/5.mp3", coverPath:"./covers/5.jpg"},
    {songName:"Bol Do Na Zara", filePath:"./songs/6.mp3", coverPath:"./covers/6.jpg"},
    {songName:"Brown munde", filePath:"./songs/7.mp3", coverPath:"./covers/7.jpg"},
    {songName:"Pee loon", filePath:"./songs/8.mp3", coverPath:"./covers/8.jpg"},
    {songName:"Insane", filePath:"./songs/9.mp3", coverPath:"./covers/9.jpg"},
    {songName:"Kesariya", filePath:"./songs/10.mp3", coverPath:"./covers/10.jpg"},
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause. When we click play, it plays song and put pause button
// else, it pause the video and puts play button.
masterPlay.addEventListener('click',()=>{
    const currAudio = document.getElementById(audioElement.id)
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        currAudio.classList.remove('fa-play');
        currAudio.classList.add('fa-pause');
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        currAudio.classList.remove('fa-pause');
        currAudio.classList.add('fa-play');
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

// //It updates the time of song if we play, pause or skip it
audioElement.addEventListener('timeupdate',()=>{
    // Update seekbar, progress percentage calculated
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // When I click on play in songlist, it turn to pause
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName;
        if(audioElement.id!==e.target.id || (audioElement.paused && audioElement.currentTime<=0)){
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = `./songs/${songIndex+1}.mp3`;
            audioElement.id = songIndex
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
        else{
            if(audioElement.id===e.target.id){
                if(audioElement.paused){
                    audioElement.play()
                    e.target.classList.remove('fa-play');
                    e.target.classList.add('fa-pause');
                    masterPlay.classList.remove('fa-play');
                    masterPlay.classList.add('fa-pause');
                }
                else {
                    audioElement.pause();
                    masterPlay.classList.remove('fa-pause');
                    masterPlay.classList.add('fa-play');
                }
            }
        }
    })
})


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `./songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `./songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
