The family js contains two class function. 
One is a node class function that uses linking concept to represent a single person. It contains the person name, information in an array, link to spouse node, links to parent node, and links to children. There are also methods to interact with each of the fields which allow the value of the field to be set, change or remove.

The other is a family class function for record all family member node. User can add new family members, set relations, remove members, remove relations and also display all descendants with the method showDes. Below is a list of methods for this class.
#List of methods
addmember(name, birth) to add family member  Parameter: the person's name and the person's birthday. Condition: There cannot be another person with the same name already in the family

changeName(oldname, newname) to change a specific member's name Parameter: the current name and the new name. Condition: newname cannot be already used on a member of the family.

setChildern(target, childern) set childern for a specific member Parameter: the parent's name and the child's name. Condition: Both parent and child should already be added into the family.

setSpouse(target, spouse) set 
