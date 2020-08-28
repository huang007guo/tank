//tank对象
function tankobj(x,y,rotate,speed,ismy){
	if(typeof rotate=='undefined')
	{
		rotate = 0;
	}
	if(typeof speed=='undefined')
	{
		speed = 1;
	}
	if(typeof ismy=='undefined')
	{
		ismy = false;
	}
	tankobj.prototype.diesum = 10;
	this.x = x;
	this.y = y;
	this.img = document.getElementById('tank');
	this.width = this.img.width;
	this.height= this.img.height;
	this.rotate = rotate;
	this.speed = speed;
	this.shellimg = '';
	this.shell = new Array();
	this.ismy = ismy;
	this.die = 0;
	if(typeof tankobj._isfun == 'undefined')
	{
		tankobj.prototype.uprotate = function (rotate){
			if(this.die>=1)return;
			if(rotate-this.rotate!=Math.PI/2&&rotate-this.rotate!=-Math.PI/2&&rotate-this.rotate!=(3*Math.PI/2)&&rotate-this.rotate!=-(3*Math.PI/2))
			{
				return false;
			}
			this.rotate = rotate;
			
		}
		tankobj.prototype.auto_rotate = function (){
			if(this.die>=1)return;
			var ran = Math.random();
			if(0<=ran&&ran<0.25)
			{	
				ran = 0;
			}else if(0.25<=ran&&ran<0.5)
			{
				ran = Math.PI/2;
			}else if(0.5<=ran&&ran<0.75)
			{
				ran = Math.PI;
			}else if(0.75<=ran&&ran<=1)
			{
				ran = 3*Math.PI/2;
			}
			
			this.rotate=ran;
		}
		tankobj.prototype.show = function (){
			if(this.die>=this.diesum) return false;
			var i;
			cxt.save();
			cxt.rotate(this.rotate);
			switch (this.rotate){
				case 0:cxt.translate(this.x,this.y);break;
				case Math.PI/2:cxt.translate(this.y,-this.x);break;
				case Math.PI:cxt.translate(-this.x,-this.y);break;
				case (3*Math.PI)/2:cxt.translate(-this.y,this.x);break;
				default : break;
			}
			cxt.drawImage(this.img,-this.width/2,-this.height/2);
			if(this.ismy)
			{
				cxt.fillStyle = "rgba(255,0,0,0.8)";
				cxt.fillRect(-6,0,12,20);
			}
			else
			{
				var gap = this.ret_gap(tank);
				if(this.die==0&&gap.x<0&&gap.y<0)
				{
					cxt.restore();tank.godie();cxt.save();run_var.is_end = true;
				}
					
			}
			cxt.restore();
			if(this.die>=1)
			{
				this.godie();
			}
			for(i=0;i<this.shell.length;i++)
			{
				if(this.shell[i].run()===false)
				{
					this.shell.splice(i,1);
				}
				else
				{
					if(this.shell[i].show()=='die')
					{
						this.shell.splice(i,1);
					}
				}
			}
		}
		tankobj.prototype.gospeed = function (){
			if(this.die>=1)
			{
				return ;
			}
			if(this.speed!=0)
			{
			switch (this.rotate){
				case 0:
					if(this.y-this.speed>=0)
						this.y -= this.speed;
					else
						return false;
					break;
				case Math.PI/2:
					if(this.x+this.speed<=myCanvas.width)
						this.x += this.speed;
					else
						return false;
					break;
				case Math.PI:
					if(this.y + this.speed<=myCanvas.height)
						this.y += this.speed;
					else
						return false;
					break;
				case (3*Math.PI)/2:
					if(this.x - this.speed>=0)
						this.x -= this.speed;
					else
						return false;
					break;
				default : break;
			}
			}
		}
		tankobj.prototype.goshell = function (){
			if(this.die>=1)return;
			var x = this.x,y = this.y;
			switch (this.rotate){
				case 0:
					y = this.y-20;
					break;
				case Math.PI/2:
					x = this.x+20;
					break;
				case Math.PI:
					y = this.y+20;
					break;
				case (3*Math.PI)/2:
					x = this.x-20;
					break;
				default : break;
			}
			var myshell = new shellobj(x,y,this.rotate,this.speed+4,this.ismy);
			if(this.shellimg!='')
			{
				myshell.setimg(this.shellimg);
			}
			this.shell.push(myshell);
		}
		tankobj.prototype.godie = function (){
			if(this.die>=this.diesum)
				return true;
			cxt.save();
			cxt.rotate(this.rotate);
			switch (this.rotate){
				case 0:cxt.translate(this.x,this.y);break;
				case Math.PI/2:cxt.translate(this.y,-this.x);break;
				case Math.PI:cxt.translate(-this.x,-this.y);break;
				case (3*Math.PI)/2:cxt.translate(-this.y,this.x);break;
				default : break;
			}
			cxt.fillStyle = "rgba(0,0,255,1)";
			cxt.fillRect(-(15+(this.die*4))/2,-(15+(this.die*4))/2,15+(this.die*4),15+(this.die*4));
			this.die +=1 ;
			cxt.restore();
			
			
		}
		tankobj.prototype.setimg = function (imgele){
			if(imgele==null||imgele=='')return;
			this.img = imgele;
			this.width = imgele.width;
			this.height= imgele.height;
		}
		//边界距离
		tankobj.prototype.ret_gap = function (obj){
			var ret = {x:false,y:false};
			//x宽和 y高和
			var x_sum,y_sum;
			//平行
			if((this.rotate-obj.rotate)%Math.PI==0)
			{
				if(this.rotate%Math.PI==0)
				{
					x_sum = this.width+obj.width;
					y_sum = this.height+obj.height;
				}
				else
				{
					x_sum = this.height+obj.height;
					y_sum = this.width+obj.width;;
				}
				//x轴两物体距离
				// ret.x = (obj.x-this.x>0)?((obj.x-this.x)-(this.width/2+obj.width/2)):((this.x-obj.x)-(this.width/2+obj.width/2));
				// //y轴两物体距离
				// ret.y = (obj.y-this.y>0)?((obj.y-this.y)-(this.height/2+obj.height/2)):((this.y-obj.y)-(this.height/2+obj.height/2));
		
			}//垂直
			else
			{
				if(this.rotate%Math.PI==0)
				{
					x_sum = this.width+obj.height;
					y_sum = this.height+obj.width;
				}
				else
				{
					x_sum = this.height+obj.width;
					y_sum = this.width+obj.height;;
				}
			}
			//x轴两物体距离
			ret.x = (obj.x-this.x>0)?((obj.x-this.x)-x_sum/2):((this.x-obj.x)-x_sum/2);
			//y轴两物体距离
			ret.y = (obj.y-this.y>0)?((obj.y-this.y)-y_sum/2):((this.y-obj.y)-y_sum/2);
			$('#text_div').html("<br>"+ret.x+" "+ret.y);
			return ret;
		}
		tankobj._isfun = true;
	}
}