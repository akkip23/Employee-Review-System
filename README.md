# NodeJS-Employee-Review-System

 <h1 align="center">Employee Review System</h1>
 
# Employee-Review-System
<p>-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*-*-**-*-*-*-*-*-**-*-*-*-*-*-*</p>

<h5 align="center">A Default Admin Account has already been created which is used initially to login in as admin and assign task to employees and Mark other employee as admin this admin account cannot be deleted or cannot make changes to it credential for default Admin are below</h5>

<h4 align="center"> Email : admin.cc@gmail.com</h4>
<h4 align="center"> Username : Admin</h4>
<h4 align="center"> password : ccAdmin@123</h4>

<p>-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*-*-**-*-*-*-*-*-**-*-*-*-*-*-*</p>

Employee review system app used for reviewing employee.

### Description

<p align="center">
  A full stack app, in which the admin, can assign the employees, to review each other on the basic of there work. The admin has special power, to make any other employee
  as the new admin. Admin can also make the new employee, and they can also assing, the reviewer and revieweee. The admin can see the current employee, and according to the
  review, the admin can remove the employee. The review given to the employee, is always going to be store in the database.
</p>

### App built using

Node , Express, Mongodb , EJS , javaScript , html, css, jQuery and PassportJS

### Features

- Sign up / Sign in forms for employees.
- You can review the employees.
- The admin has the special power to assing, the task to employee, remove the employee, add new admin, and also employee.
- The admin can also update the reviews for any employee and can also delete any employee's reviews.
- the employee can review their co-employees.
- employees can view their review which are given by other employees.

## Setup

Run `npm install` to install required dependencies

Config.env File (DOTENV): create a cofig.env file in the root of your project and add the below given data

- PORT = [Your Port]
- SESSION_SECREAT = [Your Secret]
- DB = [Your MongoDB Ur]
- ASSETS_PATH = [Your Assets Files To Access From]
