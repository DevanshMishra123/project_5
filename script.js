console.log("Welcome to Spotify");
let songIndex = 1;
let audioElement = new Audio(`${songIndex}.mp3`);
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songname: "Let me love you", filepath: "DJ Snake - Let Me Love You ft. Justin Bieber.mp3", coverpath: "cover/img_s1.jpeg"},
    {songname: "Eternxlkz - BRODYAGA FUNK (Official Audio).mp3", filepath: "Eternxlkz - BRODYAGA FUNK (Official Audio).mp3", coverpath: "cover/pho.jpeg"},
    {songname: "Rockabye", filepath: "song/Eternxlkz - BRODYAGA FUNK (Official Audio).mp3", coverpath: "cover/img_s5.jpg"},
    {songname: "Starboy", filepath: "song/Eternxlkz - BRODYAGA FUNK (Official Audio).mp3", coverpath: "cover/img_s3.jpeg"},
    {songname: "Binding Lights", filepath: "song/Eternxlkz - BRODYAGA FUNK (Official Audio).mp3", coverpath: "cover/img_s4.jpeg"},
    {songname: "God Sigma", filepath: "song/Eternxlkz - BRODYAGA FUNK (Official Audio).mp3", coverpath: "cover/img_s6.jpeg"},
    {songname: "Life in Rio", filepath: "song/Eternxlkz - BRODYAGA FUNK (Official Audio).mp3", coverpath: "cover/img_s2.jpeg"},
]
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songname;
})
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        let ele = document.getElementById(`${songIndex}`);
        ele.classList.remove('fa-play-circle');
        ele.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }else {
        audioElement.pause();
        let ele = document.getElementById(`${songIndex}`);
        ele.classList.remove('fa-pause-circle');
        ele.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
audioElement.addEventListener('ended', () => {
    console.log('Song ended');
    document.getElementById('next').click();
})
myProgressBar.addEventListener('input',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})
const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    }) 
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        songIndex = parseInt(e.target.id);
        let currentSrc = audioElement.src.split('/').pop();
        if(currentSrc == `${songIndex}.mp3`){
            if(audioElement.paused){
                gif.style.opacity = 1;
                audioElement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            }
            else{
                audioElement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
            }
        }
        else{
            makeallplays();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex-1].songname;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    })
})
document.getElementById('next').addEventListener('click',()=>{
    songIndex=(songIndex)%7 + 1;
    makeallplays();
    let ele = document.getElementById(`${songIndex}`);
    ele.classList.remove('fa-play-circle');
    ele.classList.add('fa-pause-circle');
    audioElement.src = `${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex==1)
        songIndex=7;
    else
        songIndex--;
    makeallplays();
    let ele = document.getElementById(`${songIndex}`);
    ele.classList.remove('fa-play-circle');
    ele.classList.add('fa-pause-circle');
    audioElement.src = `${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})