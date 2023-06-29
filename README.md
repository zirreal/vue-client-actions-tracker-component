# vue-client-actions-tracker-component

This is the easy-to-use vue component for web analytics tracking with user's consent.

The component works with Vue 2.

The tracker won't work without user's consent. If user didn't choose option accepting tracking, than no client's actions will be tracked.


## Set up

```
npm install vue-client-actions-tracker --save

import Vue from 'vue'

// tracker component
import userTracker from 'vue-client-actions-tracker'
import '../node_modules/vue-client-actions-tracker/dist/vue-client-actions-tracker-component.css' // for styles

Vue.use(userTracker) // tracker uses vue-cookies plugin and by default cookies expiration date set to 90 days.

- If you want to change the expiration date: 
Vue.use(userTracker, {cookiesExpirationDate: '15d'})

```

## How to use

Component generally has three options:

1. **Allow metrics** (all tracking are allowed (e.g google analytics), cookies and localStorage also can be used)

2. **Only critical actions** (only cookies and localStorage are available)

3. **Disallow any actions** (no tracking is available, cookies (with the exception of one cookie that we are saving when user is choosing the option. it's needed so not to show the tracker component every time the user opens the page) and localStorage as well)


In your template use component like that: 

```
<template>
    <userTracker/>
</template>

```

## Properties

| Property          | Required | Default                                          | Type   | Description                                                                                                                                 |
|-------------------|----------|--------------------------------------------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------|
| privacyPolicyLink | false    | ''                                               | String | If you want to have a special link to the privacy policy page you need to add this property with the url to the page. E.g. '/privacy-policy |
| title             | false    | Choose the way to communicate with this website: | String | Title of your tracker                                                                                                                       |
| buttonTitle       | false    | Ok                                               | String | Title of the acceptance button                                                                                                              |
| allowTitle        | false    | Allow metrics                                    | String | Title for the allow option                                                                                                                  |
| criticalTitle     | false    | Only critical actions                            | String | Title for the critical only option                                                                                                          |
| disallowTitle     | false    | Disallow any actions                             | String | Title for the disallow actions option                                                                                                       |
| classCustom       | false    | ''                                               | String | Custom classes for the component for custom styles                                                                                          |


## Methods

The component has one method `activateTracker` so you can activate preferable web analytics:

```
    methods: {
      setTracker() {
        // i used matomo so my function looked something like that
        this.$matomo && this.$matomo.setConsentGiven();
        this.$matomo && this.$matomo.trackPageView();
      }
    }
```

The method fires only if user allowed metrics!

### Example: 

`different title and custom class with activateTracker method`

```
<template>
    <userTracker
      title="Some new title here"
      customClass="my-tracker"
      @activateTracker="setTracker"
    />
</template>
```





