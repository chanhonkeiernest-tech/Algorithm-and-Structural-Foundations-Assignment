The family js contains two class function. 
One is a node class function that uses linking concept to represent a single person. It contains the person name, information in an array, link to spouse node, links to parent node, and links to children. There are also methods to interact with each of the fields which allow the value of the field to be set, change or remove.

The other is a family class function for record all family member node. User can add new family members, set relations, remove members, remove relations and also display all descendants with the method showDes. Below is a list of methods for this class.
#List of methods
addmember(name, birth) to add family member  Parameter: the person's name and the person's birthday. Condition: There cannot be another person with the same name already in the family

changeName(oldname, newname) to change a specific member's name Parameter: the current name and the new name. Condition: newname cannot be already used on a member of the family.

setChildern(target, childern) set child for a specific member Parameter: the parent's name and the child's name. Condition: Both parent and child should already be added into the family.

setSpouse(target, spouse) set spouse for a member. Parameter: setter and spouse to be set. Condition: Both have not set any spouse.

setParent(target, parent) set parent for a member. Parameter: the member or child and the parent. Condition: the member who wants to set a child cannot already have two parent set.

removeRelation(target, remove) remove the relation between a member and another member. Parameter: The member who wish to remove a relation and the person who they wanted to remove. 

getInfo(name) returns information for this member. Parameter: the person's name. Return an array of objects for different information.

addInfo(name, type, info) allows information be added. Parameter: The person's name, type of information to be added exp. height, weight, and the info.

editInfo(name, type, info) allows edit of information. Parameter: The person's name, type of information wished to be edited, and the new info. Condition is the type of info should already be exist.

removeInfo(name, type) allows removal of an information. Parameter: The person's name, type of information for removal.

getSpouse(name) returns the name of the spouse for a member. Parameter: The member's name

getParents(name) returns all the parents' name for a member. Parameter: The member's name

getChilderns(name) returns all childern's name for a member. Parameter : the member's name

showDes(name, space) show all descendants. Parameter: the starting name, and the starting indentation space for the first generation.

deleteMember(name) remove a member from the family. Parameter: The name of the person to be removed. 
