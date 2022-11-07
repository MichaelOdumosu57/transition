# Format
* ask, - dont ask



# Context
* chetan is the only one working on the UI meaningfully
* high performing team, don't compromise on the quality of the application,
* very strong on requirements
* there is a push to hardcode dropdown info and avoid mcr tables
* be sure of what we need to deliver any sprint
* ppl need help with regression, unit testing
* we need to properly understand
* this application has been going on without a proper unit testing framework in place
* people are willing to jump in and help out
* raise hand when theres a blocker
* dev call is the time to go through
* dto jpa , is a best practice a slice of an entity
* sonar 60% coverage on that's written
* user documentation ,
  tech documentation none available
* we have been going so fast no time to document
* not really challenging
  * understanding the process, how we implment
    * get familiar with aadhar framework
  * ui side, data needs to send data back and forth this
  * need to under the framework, behind
* were are in a position were trying to get to a stable state, from staging to prod
* for the MCR edits were pulling down everything this is not good
  * try to bring down little chunks
  * avoid overfetching

##  Ping
* ping provides client lib within angular application
  * pung has client lib
  *
* api call for an oidc-client-id
* parse access access_token,jwt_token

* use local storage to store oidc key
* UserManger is the ping client itself


# ENGIN-mcr-ui
* it looks like grid.component is the presentation component when you get to a route
* as predicted container components get really large

## questions
* how will soft delete perform what is the api call
* in java is throw new IllegalArgumentException the way to throw an exception
* are we not using spring boot dev to do hot reload on dev changes

## app.component.ts
  * so UntilDestroy is the way like an ngUnsub, I advise that we just leverage a subject for each component so we dont have to worry about those lib imports, its optimal but is it necessary
  * I see plenty of public and private properties, is this ultimately necessary why is this so
  * Are we using promises in the application, have we felt very problematic  issue with async tasks
  - in the setAutomation fn I seean antipattern


## topbar.component
* the logout button leverages mat-toolbar
* I am noticing at a certain view point the nav primary navigation disappears this isn't good where does the navigation go

### css
  * I am seeing classes getting mixed up
  * I am seeing that we are using px instead of rem, to make this responsive we need px also I see grouping by comment code smell we should try to assoicate these to the files

### html
* I see were not leveraging *ngFor, the .ts can get a bit larger

## General
- they have layouts components folder good practice
* I see relative imports, can we use tsconfig.json to leverage paths property or no
* I also like to organize my imports into groups
* seems were not using bootstrap in the applicaton,how well do we know flexbox


## app/features/cluster/components/grid.component

### overview
* there is a button to add a new MCR tool
* you can delete only one MCR at a time, what happens is a soft delete
* to make expression change after checked go away in dto instead of using async pipe, assign to a variable and let that fn update the vairable
* for the CRUD operations there is
  'api/workflow/mcrUpdateReasons' to get the different reasons why an mcr has to change
  'api/workflow/types' to get the different workflors, ENGin workflow for those outside wells fargo and BAU for those inside


#### Questions
* how does checkAllRecord work
* in bulkActionChange, was the timer necessary
* is onSuccess method used for cached data
* are the 20+ components here even necessary
* the components from bulk action look very similar can we do something to considate this


#### getting coloumn data, for topic,status and groups
* a method getData makes all the api calls
* to get status 'api/MCRStatus' endpoint is called
* to get topics 'api/MCRTopic' endpoint is called
* to get mcr 'api/MCRCluster' endpoint is called
* to get a list of bulk actions 'api/bulkActions/dropDownValues' is called




##### Questions
* why are we leveraging cloneDeep for bulkAction is it because its more static
* are the groups preloaded because they are static
* how are responsbile  groups retrieved
* what happens when bulk action dropdowns values are update how is component information managed, it all looks static
* in the backend I am trying to find the search endpoint, it looks like a resource is being resued

#### loading the grid with elements
* I'm reviewing the grid code that utlimately will fill the table when a filter option is chosen
* a gridDataSource extends DataSource which takes GridDataSource and a gridFilterService
* gridDataSource.loadGridData is the one thatt makes the API call
* it constructs a httpParams using fns
* queryObservableFunction goes ahead and makes the api call
  * it seems there is some sort of cachning filter, or use of new additionalFilters
  * gridFilterService seems to be connected to all filters in the system
  * this.loadGridFromLocal means that there may be caching involved
  * if not then mcrClusterService.query is called to make the actual API call
  * once the call is complete resp['content'] is sent to this.gridData$ and this.totalRecords$ recevices resp['totalElements']
    * resp['content'] the element to be currently displayed
    * resp['totalElements'] total amnt of elements in the page


#####  Questions
* I am wondering if this logic is for each component its not gettin reused the predicate fn
* why are we not using di for gridFilterService are there more than one
* in gridDataSource what use does loadGridData have
* why does it seems there is soo much that goes into filtering
* can you tell me more about the DTO how does the function  transform one model to another
* I see place where we can make immediate update, columns may be the same from one area to another,
  we want to apply the princple of no anmonoyous variables so if the column has the same identity it can be reused throughout the application

#### validate User Access
* a method is called to see if the user has permission to view the page
* authorization is made to the 'api/MCRUser/me' endpoint,  that hits wellsfargo.web.rest.endpoints.identity.UserController.me endpoint
* it seems that a jwt and a session Id is used by base classes and annotations of principal.getUser() to get the correct user
* once the info is retreieved it's processed through dto and sent to the frontend of which resources user can use


##### Questions
* can validateUserAccess be created once so then we don't have se eit several times throughout the app
* this method does not seem to do anything what it really for

#### Export Data
* there is a method exportMCRData, it looks like like for all export functionality it makes api call;
  * api/MCRExport calls mcrExportService.doExportData which hardcode the value needed to be written to the excel sheet and outputs as such in a dto, where the file is part of the dto
  however this endpoint is not functioning too well, right now it executing like it hit an infinite loop
  * api/MCRExtract is responsible for the csv data, it too is not functioning well

##### Questions
* why do yo pass ()=>undefined, to subscribe its not necessary just call it
* can we make that logic reusable
* can we make the client handle export data, or is there more data in the exports that the server has to do it
*




## app/cluster/components/form.component.ts

### overview
* there is parent component, and child component does nothing parent component does everythin

### questions
* everytime we hit expand were making API call is this acceptable

# Questions

## Devops Questions
* Am I looking at the correct repos,
* How are the project repos organized and which does each mean
* do you have a naming convention in git
* how do we merge our work into the deployment pipeline
* can we have access to github copilot
* is there singleton


## Backend Questions
* for our auth service can we update to java 17
* what java libs do we use to handle security such as example never enter negative amnt of days
* do you have swagger plugin setup for java does it really provide all the command line args
* are gradle packages known as jar
* so if you have a get resource by id endpoint, and the resource isn't found what http status do you return
* do you always check if a resource is available before you return
* is the application a microservice or a monolith
  * microservice
* ususally an API  has serveral different error codes and side messages what coding methods do you use to account for this
* are success/fail responses structured according to the same JSON
* is the a config object and do we have different configs based on environments
* what are the coding patterns we can see generated throughtout the app how should we do things
* tell me more about pagination are there filterBy,filterPredicate,filterValue,sortValue,sortBy,pageSize,pageNum
* global dependencies
* is the project using jar or war

### Database
* how is data stored
* how is data backed up in the application


## Frontend Questions
* I see were using template driven form, how does [()] binding work
* is most of this code dead code
* what are the components that hold the most signficance
* are we leveraging bootstrap or how is are css done is there a certain pattern
* how are we leveraging i18n, is there any plans for it will we use translation software or 3rd party vendor
* how is the application divided
* is the application accessible
* what are the coding patterns we can see generated throughtout the app how should we do things
* how is file upload download handled do you have a file upload component
* for your dropdowns do they load all the data or some of the data and as they scroll does data get larger
* how is the navigation working (because navigation gets interesting)
* are there schematic templates
* lot of repeated code


### Code analysis
src/app/app.component.ts what is

### CSS
* in 2 projects I have seen this complicated scss can you explain to me how it works
* I see styles.css is this maintainable for you file so large
* I see componets are divided into sections, and they you use a common class .wrapper in the section
* angular fxFlex instead of flexbox

### Forms
* template-driven, or reactive forms
* are errors shown as a user types or are they shown when they are at the end or they move on to the next slide
* are the sucess/fail responses are uniform, how do you cascade those errors back to the fields even complex fields


## Logging Questions
* what events are logged in the application
* is there a way to clean the logs
* I hear you use splunk logs what its for

## Mobile Questions

## Testing Questions
* do we do unit tests or additional e2e tests as well in the frontend
* what are the technologies used to do unit testing can you tell me about them

## Agile questions
* where is our cloud workspace so I can put onboarding docs there

## Additional Questions
* even through BAU will never go back to ENGin, we should always make try
* what is tech grooming and what are all the different types of meetings out there
* what is liquibase our new authorization service
* ENGin authorization service, and channel secure, major changes now in authorization
* the url is changing
* for your story problem can you analyze stories which we understood from the start and go from that example
* what are dto's all about
* what are the most significant problems you are facing right now
* how can I help
* what does documentation look like
  * how can I add my documentation to confluence
* how do you resolve disagreements in how code should be done
* how is the work of QA,API,UI done here it seems more people can help out as needed
* how does installation and setup look like any important steps
* how should understand current tasks in relation to the project
* what additional questions should I be asking about the application
* ang

* gradle is a tool that uses maven that downloads the dependency and builds the app
* udemy course


