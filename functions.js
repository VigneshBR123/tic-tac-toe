const shells=document.querySelectorAll('.box')
const game_status=document.querySelector('.status')
const button_restart=document.querySelector('.restart')
let x='X'
let o='O'
let win_probability=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]
let options=['','','','','','','','','']
let current_player=x
let player='X'
let game_on=false
initalize()
function initalize(){
    shells.forEach(box=>box.addEventListener('click',click_box))
    button_restart.addEventListener('click',restart)
    game_status.textContent=`${player}'s Turn Buddie`
    game_on=true
}
function click_box(){
    let index=this.dataset.values
    if(options[index]!='' || !game_on){
        return
    }
    update_box(this,index)
    check_winner()
}
function update_box(shells,index){
    options[index]=player
    shells.innerHTML=current_player
}
function check_winner(){
    let game_over=false
    for(i=0;i<win_probability.length;i++){
        let filled=win_probability[i] //[0,1,2]
        const box1=options[filled[0]]
        const box2=options[filled[1]]
        const box3=options[filled[2]]
        if(box1=='' || box2=='' || box3==''){
            continue
        }
        if(box1==box2 && box2==box3){
            game_over=true
            shells[filled[0]].classList.add('win')
            shells[filled[1]].classList.add('win')
            shells[filled[2]].classList.add('win')
        }
    }
    if(game_over){
        game_status.textContent=`${player} Won...!`
        game_on=false
    }
    else if(!options.includes('')){
        game_status.textContent='Game Draw...!'
    }
    else{
        change_player()
    }
}
function change_player(){
    if(player=='X'){
        player='O'
    }
    else{
        player='X'
    }
    if(current_player==x){
        current_player=o
    }
    else{
        current_player=x
    }
    game_status.textContent=`${player}'s Turn Buddie`
}
function restart(){
    options=['','','','','','','','','']
    current_player=x
    player='X'
    game_on=true
    shells.forEach(box=>{
    box.innerHTML=''
    box.classList.remove('win')})
    game_status.textContent='Play Again Dudes'
}