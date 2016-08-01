# **ACTLabs Form Planner**

The ACTLabs Form Planner is a web-based tool for resource planning and management. You can have different scenarios, which consist of different activities and constraints, showing you how much resources are being utilized and how much are left. It provides a graph that is updated in real-time.  

Currently, the application is restricted to 4 different scenarios, and each scenario consists of 3 different resources. The number of activities in each scenario, and constraints imposed on them do not have any limits.  

ACTLabs Form Planner is currently hosted at 'http://form-planner.actlabs.org'  

The website offers basic authorization. You will not be able to access them unless you enter the correct credentials. They are:  
**username:** actlabs  
**password:** formplanner

# **Technologies Used**  

1. The basic layout of the website was done using Bootstrap, **HTML** and **CSS**. **AngularJS** and a little of **jQuery** was used to generate the content dynamically and make the interface interactive.

2. The graphs used for visualization were generated using **D3.js** (or just D3 for Data-Driven Documents), which is a JavaScript library for producing dynamic, interactive data visualizations in web browsers.

3. **Express**, which is a minimal and flexible Node.js web application framework, was used as server to run the website.  

4. Finally, **Elastic Beanstalk** (Part of AWS) was used to deploy the entire project.

# **Usage** 

**Note:** Changes made to one scenario doesn't affect the other scenarios. Each scenario is completely independent of the others.  

Initially, each of the three resources (Red, Blue, White) are set to 30, for each scenario. The user has the option to perform the following actions:

## **Reset resources/ Set Initial**:  
This button allows the user to reset the entire progress made so far, and also gives the option to set the initial availability of resources. If left blank, the resources get automatically initialized to 30.

![Screen Shot 2016-07-29 at 12.04.57 PM.png](https://bitbucket.org/repo/B4Mqpj/images/1702607164-Screen%20Shot%202016-07-29%20at%2012.04.57%20PM.png)

## **Add Activity**:  
Initially, for any scenario, no activities exist. Activities are basically groups of constraints. Users have to click the 'Add Activity' button, and specify its name to add an activity. Creating an empty activity does not affect the graph. 

## **Add Constraint**:
Constraints are the conditions that utilize the resources and cause changes in the graph. The application supports two types of constraints, which can be selected from the dropdown list that appears on hovering on the 'Add Constraints' button. 

![Screen Shot 2016-07-29 at 12.17.29 PM.png](https://bitbucket.org/repo/B4Mqpj/images/2795278029-Screen%20Shot%202016-07-29%20at%2012.17.29%20PM.png)  

* **Consume**:  
Clicking this pops up a dialogue box as shown below. Currently, application allows adding resources from June 2016 - December 2021. If the user wants that the resource be made available after the end date, he can do so by clicking on the checkbox. This type of constraint consumes resources, resulting in a decrease in the corresponding graph value.  
![Screen Shot 2016-07-29 at 12.22.41 PM.png](https://bitbucket.org/repo/B4Mqpj/images/1540783897-Screen%20Shot%202016-07-29%20at%2012.22.41%20PM.png)  

* **Restock**:  
Clicking this pops up a similar dialogue box as before, but without the End Date and the checkbox. This type of constraint adds resources to the inventory from the period specified, resulting in an increase in the corresponding graph value.  

### **Editing Constraints**:  
![Screen Shot 2016-07-29 at 12.42.04 PM.png](https://bitbucket.org/repo/B4Mqpj/images/2875430744-Screen%20Shot%202016-07-29%20at%2012.42.04%20PM.png)

On adding a constraint, it is automatically reflected in the graph. Whether the resources will be available after the end date is represented by the ![Screen Shot 2016-07-29 at 12.38.11 PM.png](https://bitbucket.org/repo/B4Mqpj/images/3740122963-Screen%20Shot%202016-07-29%20at%2012.38.11%20PM.png) icon. The user has the option to:  

* **Disbable Constraint**:  
On clicking this, the constraint will be temporarily disabled. The graph will be updated accordingly. Disabled Constraints will be struck out in the list.  

* **Enable Constraint**:  
On clicking this, the constraint will be enabled again, and the line through it will disappear. The graph will also  get updated.  

* **Delete Constraints**:  
The constraint can be permanently deleted by clicking :heavy_minus_sign:. This will permanently delete the constraint from the list and update the graph accordingly.  

### **Delete Activity**:  
The entire activity can be deleted by clicking :heavy_minus_sign: next to it. Clicking this pops up a confirmation box, on approval of which, all the constraints contained in the activity will be deleted and the graph will be updated. The Activity will also be removed from the list.  

### **Save**:  
Any changes made in the activity or the constraints have to be saved before leaving the page, or switching scenarios. The application will pop up a confirmation box, when the user tries to leave the page or switch scenarios with any unsaved changes. Clicking on the 'Save' button permanently overwrites the changes made, and any prior state cannot be recovered.  

### **Switch Scenarios**:  
![Screen Shot 2016-07-31 at 4.25.44 PM.png](https://bitbucket.org/repo/B4Mqpj/images/3205403414-Screen%20Shot%202016-07-31%20at%204.25.44%20PM.png)  
  
This list contains 4 different scenarios to choose from. Each scenario is completely independent of the other. On switching to another scenario, all unsaved changes are lost.