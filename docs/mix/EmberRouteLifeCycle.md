


- `init()`: The public function init() will be called at first. Basically it does nothing unless overridden in the class definition.
- `beforeModel(transition)`: This hook is called after the init() hook with first parameter as transition. So depending on your requirement, if you want to do some pre model things, such as getting required data to request the model, aborting the transition and redirecting somewhere else etc, you can do that.
- `model(params, transition)`: The next public hook is model(), using which you define the model for that route.
- `afterModel(resolvedModel, transition)`: This is called after the model() hook is resolved; with the first parameter as the model itself and the second as transition.
- `setupController(controller, model)`: You have a hook named setupController() in Ember’s routes where you can tweak the controller instance or the resolved model.
- `renderTemplate(controller, model)`: When getting a model and setting up the controller is done, then at the end renderTemplate() hook is called to render the appropriate template.
- `exit()`: When you navigate to some other route, the existing route will call its exit() hook.
- `deactivate()`: This hook will be called once it completely exits the route.

