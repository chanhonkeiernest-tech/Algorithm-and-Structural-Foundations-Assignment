export class PeopleNode {//a person node class function 
    constructor(name, info) {
        this.name = name; // Person name
        this.info=info;//This will come in an array format and object element within it.
        this.childerns = [];  //A list of childern node object
        this.spouse = null; //a spouse node object
        this.p1 = null;//a parent 1 node object
        this.p2 = null;//a parent 2 node object

    
    }
    addspouse(spouse){//set spouse node 
        if(spouse!==null){
            this.spouse=spouse;
        }
        
    }
    removespouse(){//remove spouse node
        this.spouse=null;
    }
    addchildern(childern){//add childern node element and prevent same childern from being added
        if(this.childerns.includes(childern)===false)this.childerns.push(childern);
        
    }
    removechildern(childern){//remove a specific childern node
        
        this.childerns.splice(childern,1);
    }
    addParent(parent){//set parent node 
        if(this.p1==null){
            this.p1=parent;
            return true;
        }else if(this.p2==null){
            this.p2=parent;
            return true;
        }
        return false;
    }
    removeP1(){//remove one of the parent node
        this.p1 = null;
        
    }
    removeP2(){//remove one of the parent node
        this.p2=null;
    }

    getDescendants(){//returns the entire childerns array 
        return this.childerns;
    }
    getSpouse(){//returns the spouse node
        return this.spouse;
    }
    getName(){//returns only the name for this node
        return this.name;
    }
    getp1(){//returns one of the parent
        return this.p1;
    }
    getp2(){//returns one of the other parent
        return this.p2;
    }
    changeName(newName){//a change name function
        this.name=newName;
    }
    addinfo(type, newinfo){//gets specific information
        for(let i=0;i<this.info.length;i++){
            if(this.info[i][type]){
                this.info[i][type]=newinfo;
                return this.info[i];
                break;
                
                
            }
        }
        const newType = {type : newinfo};
        return this.info.push(newType);
    }
    removeinfo(target){//remove a specific information
        for(let i=0;i<this.info.length;i++){
            if(this.info[i][target]){
                return this.info.splice(i,1);
                
                break;
            }
        }
        return null;
    }
    editinfo(target, newinfo){//edit the information
        for(let i=0;i<this.info.length;i++){
            if(this.info[i][target]){
                this.info[i][target]=newinfo;
                return this.info[i];
                break;
            }
        }
        return null;
    }
    parentsNotFilled(){//a checking function to confirm this node is pointing at less than 2 parent nodes.
        if(this.p1===null||this.p2===null)return true;
        return false;
    }

    getinfo(){//return all information
        return this.info;
    }
    delete(){//a delete function which will remove all relation pointing
        if(this.spouse)this.spouse.removespouse(); //removing spouse side
        if(this.childerns!==[]){  //removing each childern side
            for(let i=0;i<this.childerns.length;i++){
                if(this.childerns[i].getp1().getName()==this.name){
                    this.childerns[i].removeP1();
                } else if(this.childerns[i].getp2().getName()==this.name){
                    this.childerns[i].removeP2();
                }
            }
        }
        if(this.p1){ //removing parent's side
            this.p1.removechildern(this);
        }
        if(this.p2){ //removing parent's side 2
            this.p2.removechildern(this);
        }
        this.spouse=null;
        this.childerns=[];
        this.p1=null;
        this.p2=null;
    }
}

export class familyTree{ //a class function for onrgainizing family 
    constructor() {
        this.members =[];//this array record all memeber in the family
    }
    changeName(oldname, newname){//name change function. Rejects if name is not unique for this family and no targted member found
        let notAdded = -1;
        let unique = true;
        for(let k=0;k<this.members.length;k++){ //ensure existance 
            if(this.members[k].getName()===oldname){
                
                notAdded = k;
                
            }
            if(this.members[k].getName()===newname)unique=false; //ensure uniqueness 
        }
        if(notAdded===-1||unique===false) return false;
        this.members[k].changeName(newname);
        return true;
       

    }
    addmember(name, birth){ //adding member my taking a person name and birthday. The name has to be unique within the family
        const temp = {birthday: birth}
        const newNode = new PeopleNode(name, [temp]);
        
        let notAdded = -1;
        for(let k=0;k<this.members.length;k++){//make sure the name is unique
            if(this.members[k].getName()===name){
                
                notAdded = k;
                break;
            }
        }
        if(notAdded!==-1) return false;
        this.members.push(newNode);//push the memeber into the array
        return true;
    }
    setChildern(target, childern){//Set the childern relation for a particular member. It will also set the parent relation for said childern. It will not set the relation if the child already has two parents in record.
        
        let childIndex = -1;
        for(let k=0;k<this.members.length;k++){
            if(this.members[k].getName()===childern&&this.members[k].parentsNotFilled()===true){//finds the child member node first
                
                childIndex = k;
                break;
            }
        }
        if(childIndex===-1) return false;
        for (let i=0;i<this.members.length;i++){//finds the other member node and starts the relation set process
            if(this.members[i].getName()===target){
                if(this.members[childIndex].addParent(this.members[i])){
                    this.members[i].addchildern(this.members[childIndex]);
                    return true;
                }
                
            }
        }
        return false;
    }

    setSpouse(target, spouse){ //set spouse relation for a partiular member. It will also set the spouse relation of said spouse. Will not set spouse if spouse has already been set.
         let spouseIndex = -1;
        for(let k=0;k<this.members.length;k++){
            
            if(this.members[k].getName()===spouse&&this.members[k].getSpouse()===null){//finds the spouse memeber node
                
                spouseIndex = k;
                break;
            }
        }
        
        if(spouseIndex===-1) return false;
        for (let i=0;i<this.members.length;i++){
            if(this.members[i].getName()===target&&this.members[i].getSpouse()===null){ //find the memeber node
                this.members[i].addspouse(this.members[spouseIndex]);
                this.members[spouseIndex].addspouse(this.members[i]);
                return true;
            }
        }
        return false;
    }

    setParent(target, parent){//Use the same child relation function
        return this.setChildern(parent, target);
    }

    removeRelation(target, remove){//remove a relationship between two person.
        let targetIndex=-1;
         for(let k=0;k<this.members.length;k++){//the remove target node
            if(this.members[k].getName()===target){
                
                targetIndex = k;
                break;
            }
        }
        if(targetIndex===-1)return false;
        if(this.members[targetIndex].getp1()!==null){//remove parent 1 case
            if(this.members[targetIndex].getp1().getName()===remove){
                const temp=this.members[targetIndex].getp1();
                this.members[targetIndex].removeP1();
                temp.removechildern(this.members[targetIndex]);
                return true;
            }
            
        }
        if(this.members[targetIndex].getp2()!==null){//remove parent 2 case
            if(this.members[targetIndex].getp2().getName()===remove){
                const temp=this.members[targetIndex].getp2();
                this.members[targetIndex].removeP2();
                temp.removechildern(this.members[targetIndex]);
                return true;
            }

            
        }
        if(this.members[targetIndex].getSpouse()!==null){//remove spouse case
           // console.log(this.members[targetIndex].getSpouse);
            if(this.members[targetIndex].getSpouse().getName()===remove){
                const temp=this.members[targetIndex].getSpouse();
                this.members[targetIndex].removespouse();
                temp.removespouse();
                return true;
            }
            
        }
        const child = this.members[targetIndex].getDescendants();
        if(child.length>0) {//remove childern case
            
            for(let i = 0 ; i<child.length ; i++) {
                
                if(child[i].getName()===remove){
                    if(child[i].getp1().getName()===target){
                        child[i].removeP1();
                        this.members[targetIndex].removechildern(child[i]);
                    }else{
                        child[i].removeP2();
                        this.members[targetIndex].removechildern(child[i]);
                    }
                    
                    return true;
                }
            }
        }
        return false;

        
        
    }



    getMember(name){//an internal function and it is only for this class
        let notAdded = -1;
        for(let k=0;k<this.members.length;k++){
            if(this.members[k].getName()===name){
               
                return this.members[k];

                
            }
        }
        return null;
    }
    
    getInfo(name){//returns the birthday and other information for this person
        let notAdded = -1;
        for(let k=0;k<this.members.length;k++){
            if(this.members[k].getName()===name){
               
                return this.members[k].getinfo();

                
            }
        }
        return null;
    }

    addInfo(name, type, info){//returns the birthday and other information for this person
        let notAdded = -1;
        for(let k=0;k<this.members.length;k++){
            if(this.members[k].getName()===name){
               
                return this.members[k].addInfo(type, info);

                
            }
        }
        return null;
    }
    editInfo(name, type, info){//returns the birthday and other information for this person
        let notAdded = -1;
        for(let k=0;k<this.members.length;k++){
            if(this.members[k].getName()===name){
               
                return this.members[k].editinfo(type, info);

                
            }
        }
        return null;
    }
    removeInfo(name, type){//returns the birthday and other information for this person
        let notAdded = -1;
        for(let k=0;k<this.members.length;k++){
            if(this.members[k].getName()===name){
               
                return this.members[k].removeinfo(type);

                
            }
        }
        return null;
    }
    getSpouse(name){//returns the spouse's name
        let notAdded = -1;
        for(let k=0;k<this.members.length;k++){
            if(this.members[k].getName()===name){
               
                return this.members[k].getSpouse().getName();
                
            }
        }
        return null;
    }

    getParents(name){//returns all the parents' names
        let notAdded = -1;
        for(let k=0;k<this.members.length;k++){
            if(this.members[k].getName()===name){
                let p1 = this.members[k].getp1();
                let p2 = this.members[k].getp2();
                let text = "";
                if(p1!==null){
                    text = text+p1.getName()+" ";
                }
                if(p2!==null){
                    text = text+p2.getName()+" ";
                }
                return text;

                
            }
        }
        return null;
    }

    getChilderns(name){//returns all childerns' names
        let notAdded = -1;
        for(let k=0;k<this.members.length;k++){
            if(this.members[k].getName()===name){
                const childernsList = this.members[k].getDescendants();
                let text = "";
                for(let i = 0; i<childernsList.length;i++){
                    text= text+childernsList[i].getName()+" ";
                }
                return text;

                
            }
        }
        return null;
    }

    showDes(name, space){//function to show all descendants. You enter name of the starting and the indentation space for each gernation
        const start = this.getMember(name);
        if(!start)return null;
        let childerns = start.getDescendants();
        console.log(space+start.getName())
        for(let i=0;i<childerns.length;i++){
            this.showDesR(childerns[i],space+"   ");
        }

    }
    showDesR(start, space){//A recursive function to help displaying all descendants. Should only be use by showDes
        
        let childerns = start.getDescendants();
        console.log(space+start.getName())
        for(let i=0;i<childerns.length;i++){
            this.showDesR(childerns[i],space+"   ");
        }
    }
    deleteMember(name){//a delete function which will delete a memeber from this family object and remove all relation point to it.
        for(let k=0;k<this.members.length;k++){
            if(this.members[k].getName()===name){
                this.members[k].delete();
            }
            this.members.slice(this.members[k],1);
        }
    }
}

function showDes(start, space){//another function to get all descendants, but it takes a people node object
    
    let childerns = start.getDescendants();
    console.log(space+start.getName())
    for(let i=0;i<childerns.length;i++){
        showDes(childerns[i],space+"   ");
    }
}



//samlpe run
const house = new familyTree();

console.log(house.addmember("John", "January 1st, 1980"));

console.log(house.addmember("Jane", "July 1st, 1980"));

console.log(house.setSpouse("John", "Jane"));


console.log(house.addmember("Alex", "January 29, 2005"));


console.log(house.addmember("Emily", "January 1st, 2005"));



console.log(house.setParent("Alex", "John"));
console.log(house.setParent("Alex", "Jane"));
console.log(house.setParent("Emily", "John"));
console.log(house.setParent("Emily", "Jane"));

console.log(house.addmember("Sarah", "January 1st, 2030"));
console.log(house.addmember("Michael", "January 1st, 2030"));


console.log(house.setChildern("Alex", "Sarah"));
console.log(house.setChildern("Alex", "Michael"));



house.showDes("John", " ");


console.log(house.removeRelation("Alex", "Sarah"));


house.showDes("John", " ");

console.log(house.setChildern("Alex", "Sarah"));

house.showDes("John", " ");

console.log(house.getInfo("Emily"));

house.deleteMember("Alex");
console.log(house.getChilderns("John"));
 console.log(house.getParents("Sarah"));
house.showDes("John", " ");

console.log(house.addmember("Alex", "January 29, 2005"));

console.log(house.setParent("Alex", "John"));
console.log(house.setParent("Alex", "Jane"));

house.showDes("John", " ");
console.log(house.setChildern("Alex", "Sarah"));
console.log(house.setChildern("Alex", "Michael"));
house.showDes("John", " ");
console.log(house.getParents("Alex"));
console.log(house.getChilderns("Alex"));
console.log(house.getSpouse("Jane"));