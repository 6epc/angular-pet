# AngularPet
## Development server
Don't forget the `npm i`
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`

## Description:
This little blog is a "pet" project.
It is almost devoid of design, but is quite full of logic. The database is FireBase.
The project has a division into client and admin modules.

## Client module:
There are routers and a service with data retrieval to display a list of posts and the content of a particular post.

## Admin modules:
- Routes for admin pages.
- auth.service - service for admin authorization (email + password), if successful, token is written to localStorage.
- auth.guard.ts - for some routers there is protection with authorization check.
- auth.interceptor.ts - authorizes admin and puts token into params. If it catches an authorization error, it unlogins (clears token from localStorage) and redirects to login page.
- search.pipe.ts - allows to filter displayed posts by title.
- quill plugin is connected to create and update posts.
- alert.service.ts - allows you to output different alert(success, warnign, danger) blocks for different events. For example, when a post is created or updated.
