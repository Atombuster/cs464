# Getting current code

Whenever we make changes to our main codebase (the main branch of the class repository), you will need to get caught up.

1. **Checkout main branch**

It is good practice to checkout back to main before fetching changes and creating new branches.
  ```bash
     git checkout main
  ```

If you are unable to checkout the main branch because you have unstaged/uncommitted changes, be sure to commit your changes (you can also discard or stash the changes, but committing is the easiest way to resolve this):

### Commit Your Changes (Recommended)

If you want to keep your work:

```bash
git add .
git commit -m "Your message here"
git checkout main
```

2. **Pull the latest changes**
   
As mentioned above, you'll need to fetch the latest changes each time as the branches will be pushed to the professor's repo prior to each class.
  ```bash
     git pull upstream main
  ```
