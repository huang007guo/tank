
//shell炮弹
function shellobj(x,y,rotate,speed,ismy,color){
	if(typeof ismy=='undefined')
	{
		ismy = false;
	}
	if(typeof color=='undefined')
	{
		color = 'rgba(255,255,0,1)';
		if(ismy)
		{
			color = 'rgba(0,255,255,1)';
		}
	}
	this.x = x;
	this.y = y;
	this.img = '';
	this.width = 10;
	this.height= 10;
	this.color = color;
	this.rotate = rotate;
	this.speed = speed;
	this.ismy = ismy;
	if(typeof shellobj._isfun == 'undefined'){
		shellobj.prototype.show = function (){
			cxt.save();
			cxt.rotate(this.rotate);
			switch (this.rotate){
				case 0:cxt.translate(this.x,this.y);break;
				case Math.PI/2:cxt.translate(this.y,-this.x);break;
				case Math.PI:cxt.translate(-this.x,-this.y);break;
				case (3*Math.PI)/2:cxt.translate(-this.y,this.x);break;
				default : break;
			}
				if(this.img=='')
				{
					cxt.fillStyle = this.color;
					cxt.fillRect(-this.width/2,-this.height/2,this.width,this.height);
				}
				else
				{
					cxt.drawImage(this.img,-this.width/2,-this.height/2);
				}
		cxt.restore();
		if(!this.ismy)
		{
			var gap = this.ret_gap(tank);
			if(tank.die==0&&gap.x<0&&gap.y<0)
			{
				tank.godie();run_var.is_end = true;
				return 'die';
			}
			
		}
		else if(this.ismy)
		{
			var gap ,shellgap;
			//我的子弹撞到其他坦克
			for(i=0;i<oth_tank.length;i++)
			{
				gap = this.ret_gap(oth_tank[i]);
				if(oth_tank[i].die==0&&gap.x<0&&gap.y<0)
				{
					//if(oth_tank[i].die==0)run_var.diesum+=1;
					run_var.diesum+=1;
					oth_tank[i].godie();
					return 'die';
				}
			}
			//我的子弹撞到其他坦克的子弹
			for(i=0;i<oth_tank.length;i++)
			{

					for(k=0;k<oth_tank[i].shell.length;k++)
					{
						shellgap = this.ret_gap(oth_tank[i].shell[k]);
						if(shellgap.x<0&&shellgap.y<0)
						{
							oth_tank[i].shell.splice(k,1);
							return 'die';
						}
					}
			}
		}
		}
		shellobj.prototype.run = function (){
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
		//边界距离
		shellobj.prototype.ret_gap = function (obj){
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
		shellobj.prototype.setimg = function (imgele){
			this.img = imgele;
			if(this.img != '')
			{
				this.width = this.img.width;
				this.height= this.img.height;
			}
			else
			{
				this.width = 10;
				this.height= 10;
			}
		}
	
		shellobj._isfun = true;
	}
}