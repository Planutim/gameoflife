//create table???
var rows=30;
var columns=50;

var gtable = $('<table></table>').attr('id','gameoflife')

for(var i=0;i<rows;i++){
  var grow=$("<tr></tr>")
  for(var j=0;j<columns;j++){
    $(grow).append('<td id="'+(i*rows+columns)+'"></td>')
  }
  $(gtable).append(grow)
}
$('body').append(gtable);


var initialState = []
init();
glider();
console.log(initialState.filter(a=>a.alive).length)
var interval;
function glider(){
  initialState[190].alive=true;
  initialState[191].alive=true;
  initialState[192].alive=true;
  draw();
}


//x=td,y=tr,closest
function init(pattern=randomize){
  for(var i=0;i<rows;i++){
    for(var j=0;j<columns;j++){
      var index= i*columns+j
      initialState.push({
        y: i+1,
        x: j+1,
        alive: false,
        closest:[
          // [i-1,j-1],[i-1,j],[i-1,j+1],
          // [i,j-1],[i,j+1],
          // [i+1,j-1],[i+1,j],[i+1,j+1]
          index-columns-1,index-columns,index-columns+1,
          index-1,index+1,
          index+columns-1,index+columns,index+columns+1
        ]
      })
    }
  }
}

function step(){
  var length=initialState.length
  var mask=[]
  for(var i=0;i<length;i++){
    var a=initialState[i];
    var aliveState=a.alive;
    var count=0;
    for(var j=0;j<8;j++){
      
      var b=a.closest[j];
      if(b>=0&&b<1500&&initialState[b].alive){
        count++;
      }
    }
    if(count<2&&a.alive){
      mask.push(false)
    }
    else if(count==3&&!a.alive){
      mask.push(true)
    }
    else if(count>3&&a.alive){
      mask.push(false);
    }else{
      mask.push(aliveState);
    }
  }
  for(var i=0;i<mask.length;i++){
    initialState[i].alive=mask[i];
  }
  
  draw();
}




function draw(){
  //clear colors
  $('td').css('background','inherit');
  var a=0;
  for(var i=0;i<initialState.length;i++){
    a=initialState[i]
    if(a.alive){
      $('tr:nth-child('+a.y+') td:nth-child('+a.x+')').css('background-color','#66FF00')
    }
  }
}


function start(){
  var counter=0;
  if(interval!=undefined){
    clearInterval(interval);
    interval=undefined;
    return;
  }
  interval=setInterval(()=>{
    step()
    $('span').text(counter++);
  },100);

}

function randomize(){
  clearBoard();
  for(var i=0;i<initialState.length;i++){
    if(rand(30)>20){
      initialState[i].alive=true;
    }
  }
  draw();
  start();
}


function clearBoard(){
  clearInterval(interval);
  interval=undefined;
  
  for(var i=0;i<initialState.length;i++){
    initialState[i].alive=false;
  }
  $('td').css('background-color','#000');
}

function patterns(){
  $('.control>*').css('display','none');
  $('.control .hidden').css('display','block');
  $('.control .hidden button').click(function(){
    
    var func = $(this).attr('class').split('-').map(a=>a[0].toUpperCase()+a.slice(1)).join('')
    func = func[0].toLowerCase()+func.slice(1);

    if(func=='back'){
        $('.control>*').css('display','block');
      $('.control .hidden').css('display','none');
    }else{
      clearBoard();
      golPatterns[func]()
    }
    draw();
    }
  )
  
  

}


var golPatterns={
  centerA: rows%2?(rows*columns/2):((rows+1)*columns/2),
  
  gliderGun: function(){
    var centerA = rows%2?(rows*columns/2):((rows+1)*columns/2);
    initialState[centerA].alive=true;
    initialState[centerA-1].alive=true;
    initialState[centerA-3].alive=true;
    initialState[centerA-7].alive=true;
    initialState[centerA-16].alive=true;
    initialState[centerA-17].alive=true;
    initialState[centerA-16+columns].alive=true;
    initialState[centerA-17+columns].alive=true;
    initialState[centerA-1+columns].alive=true;
    initialState[centerA-1-columns].alive=true;
    initialState[centerA-2-columns*2].alive=true;
    initialState[centerA-4-columns*3].alive=true;
    initialState[centerA-5-columns*3].alive=true;
    initialState[centerA-6-columns*2].alive=true;
    initialState[centerA-7-columns].alive=true;
    initialState[centerA-7+columns].alive=true;
    initialState[centerA-2+columns*2].alive=true;
    initialState[centerA-6+columns*2].alive=true;
    initialState[centerA-5+columns*3].alive=true;
    initialState[centerA-4+columns*3].alive=true;
    //right gun
    initialState[centerA+5].alive=true;
    initialState[centerA+7].alive=true;
    initialState[centerA+7+columns].alive=true;
    initialState[centerA+3-columns].alive=true;
    initialState[centerA+4-columns].alive=true;
    initialState[centerA+3-columns*2].alive=true;
    initialState[centerA+4-columns*2].alive=true;
    initialState[centerA+18-columns*2].alive=true;
    initialState[centerA+17-columns*2].alive=true;
    initialState[centerA+18-columns*3].alive=true;
    initialState[centerA+17-columns*3].alive=true;
    initialState[centerA+3-columns*3].alive=true;
    initialState[centerA+4-columns*3].alive=true;
    initialState[centerA+5-columns*4].alive=true;
    initialState[centerA+7-columns*4].alive=true;
    initialState[centerA+7-columns*5].alive=true;
  },
  pulsar: function(){
    var centerA = rows%2?(rows*columns/2):((rows+1)*columns/2);
    var figure1 = [0,columns,columns-1,columns-2];
    var figure2 = [0,1,columns];
    var figure3 = [0,-1,columns-1,columns*2-1];
    
    indexes = [
       columns*2-5, columns*3-5, columns*3-6, columns*3-7,   columns-3  , columns-2, columns*2-3,
      -columns*2-5,-columns*3-5,-columns*3-6,-columns*3-7,  -columns-3  ,-columns-2,-columns*2-3,
      -columns*5-2,-columns*5-3,-columns*6-3,-columns*7-3,  -columns*3-1,-columns*2-1,-columns*3-2,
      -columns*5+2,-columns*5+3,-columns*6+3,-columns*7+3,  -columns*3+1,-columns*2+1,-columns*3+2,
      -columns*2+5,-columns*3+5,-columns*3+6,-columns*3+7,  -columns+3,  -columns+2,-columns*2+3,
       columns*2+5, columns*3+5, columns*3+6, columns*3+7,   columns+3,   columns+2, columns*2+3,
       columns*5+2, columns*5+3, columns*6+3, columns*7+3,   columns*3+1, columns*2+1, columns*3+2,
       columns*5-2, columns*5-3, columns*6-3, columns*7-3,   columns*3-1, columns*2-1, columns*3-2
    ]
    
      indexes.forEach(a=>{
        initialState[centerA+a].alive=true;
      })
  },
  crazyCorners: function(){
    var centerA = rows%2?(rows*columns/2):((rows+1)*columns/2);

    indexes=[
      ...figures.bigL(3*columns+5,'0110',false),
      ...figures.bigL(5*columns+3,'1001',true),
      ...figures.smallL(3, '1001'),
      ...figures.smallL(columns*3,'0110'),
      ...figures.bigI(centerA-5,'horizontal'),
      ...figures.bigL(3*columns-5,'1100',false),
      ...figures.bigL(5*columns-3, '0011',true),
      ...figures.smallL(columns-3,'0011'),
      ...figures.smallL(3*columns-1,'1100'),
      ...figures.bigI(centerA-5*columns,'vertical'),
      ...figures.bigL(columns*(rows-3)+4,'0011',false),
      ...figures.bigL(columns*(rows-5)+2, '1100',true),
      ...figures.smallL(columns*(rows-3), '0011'),
      ...figures.smallL(columns*(rows-1)+2,'1100'),
      ...figures.bigI(centerA+5*columns,'vertical'),
      ...figures.bigL(columns*(rows-2)-5,'1001',false),
      ...figures.bigL(columns*(rows-4)-3,'0110',true),
      ...figures.smallL(columns*rows-3, '0110'),
      ...figures.smallL(columns*(rows-2)-1,'1001'),
      ...figures.bigI(centerA+5,'horizontal')
    ]
    console.log(indexes);
    
    indexes.forEach(a=>{
      initialState[a].alive=true;
    })
  },
  pentadecathlon: function(){
    indexes = [
      ...figures.bolide(this.centerA-columns*3-10,'up'),
      this.centerA-columns*2-10,
      ...figures.bigI(this.centerA-10,'vertical'),
      ...figures.bolide(this.centerA+columns*2-10,'down'),
      ...figures.bolide(this.centerA-columns*3+10,'up'),
      this.centerA-columns*2+10,
      ...figures.bigI(this.centerA+10,'vertical'),
      ...figures.bolide(this.centerA+columns*2+10,'down'),
    ]
    
    indexes.forEach(a=>{
      initialState[a].alive=true;
    })
  },
  babyPulsar: function(){
    indexes = [
      ...figures.smallT(this.centerA-columns,'0100'),
      this.centerA-1, this.centerA+1,
      ...figures.smallT(this.centerA+columns,'0001')
    ]
    indexes.forEach(a=>{
      initialState[a].alive=true;
    })
  },
  loadPattern: function(){
    var leftC = Math.floor(this.centerA+columns*5-columns/4);
    indexes = [
      ...figures.box(columns*6+1),
      ...figures.bigI(leftC-3+columns,'horizontal'),
      ...figures.bigI(leftC-3-columns,'horizontal'),
      ...figures.bigI(leftC-2+columns*2,'vertical'),
      ...figures.bigI(leftC+2+columns*2,'vertical'),
      ...figures.bigI(leftC-2-columns*2,'vertical'),
      ...figures.bigI(leftC+2-columns*2,'vertical')
      
      
    ]
  indexes.forEach(a=>{
    initialState[a].alive=true;
  }) 
  }
 

}


function rand(max=1){
  return Math.floor(Math.random()*max);
}

var figures ={
  smallL: function(position, direction){
    //left, top, right, bottom
    var figure=[]
    switch(direction){
      case '1100':
        figure=[0,-1,-columns];break;
      case '1001':
        figure=[0,-1,columns];break;
      case '0011':
        figure=[0,1,columns];break;
      case '0110':
        figure=[0,1,-columns];break;
    }
    return figure.map(a=>{
      return position+a;
    })
  },
  bigL: function(position, direction, isInverted=false){
    var figure=[]
    switch(direction){
      case '1100':
        figure=[0,-1,-2,-columns];break;
      case '1001':
        figure=[0,-1,-2,columns];break;
      case '0011':
        figure=[0,1,2,columns];break;
      case '0110':
        figure=[0,1,2,-columns];break;
    }
    if(isInverted){
      figure[2]=figure[3]*Math.abs(figure[2]);
    }
    console.log(figure);
    return figure.map(a=>{
      return a+position;
    })
  },
  bigI: function(position,direction='horizontal'){
    var figure = []
    switch(direction){
      case 'horizontal':
        figure=[0,-1,1];break;
      case 'vertical':
        figure=[0,-columns,columns];break;
    }
    return figure.map(a=>{
      return a+position;
    })
  },
  twoI: function(position, direction='horizontal'){
    var figure=[0,1];
    if(direction='vertical')figure[1]=columns;
    return figure.map(a=>a+position);
  },
  bolide: function(position, direction='up'){
    var figure = figure=[-1,1,-columns,-columns*2]
    if(direction=='down'){
      figure=figure.map(a=>-a)
    }
    return figure.map(a=>a+position);
  },
  smallT: function(position, direction='0100'){
    var figure=[0,-1,1,-columns]
    switch(direction){
      case '0100': break;
      case '1000': figure[2]=columns;break;
      case '0010': figure[1]=columns;break;
      case '0001': figure[3]=columns;break;
    }
    return figure.map(a=>a+position)
  },
  box: function(position){
    var figure = [0,1,columns,columns+1]
    return figure.map(a=>a+position);
  }
}
