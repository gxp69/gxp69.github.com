var WEB_SIZE=[
    null,
    {w:100,h:100},
    {w:100,h:100},
    {w:100,h:100},
    {w:100,h:100},
    {w:100,h:100},
    {w:100,h:100},
    {w:100,h:100}
];

function Web(type){
    this.type=type;
    this.x=0;
    this.y=0;
    this.scale=0.5;
}

Web.prototype.draw=function(gd){
    gd.save();
    gd.translate(this.x,this.y);
    gd.scale(this.scale,this.scale);
    gd.drawImage(JSON['web'],
        0,0,200,200,
        -150,-150,200,200
    );
    gd.restore();
};














