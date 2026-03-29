# CS464 Initial Setup

## Step 1: Log in to GitHub

Before you begin, make sure you are logged in to your GitHub account. If you don't have a GitHub account yet, [create one here](https://github.com/join).

## Step 2: Fork the Repository

1. Go to the main repository URL:  
   [https://github.com/danwhite-osucascades/cs464](https://github.com/danwhite-osucascades/cs464)


2. In the top-right corner, click the **Fork** button to create a copy of the repository under your own GitHub account.  
   - This will create a forked version of the repository that you can modify without affecting the original repository.

## Step 3: Clone Your Fork to Your Local Machine

1. **Open the repository** in your own github account to get the clone link. You can find this by clicking the green **<>Code** button and copying the https url.

2. **Navigate to a directory** on your local machine where you want to store the repository. You can use the terminal to move to that directory. For example:
   ```bash
   cd ~/Documents/Projects
   ```

3. **Clone the repository** by using the git clone command with the HTTPS link you copied from your CS464 Repository
  ```bash
  git clone https://github.com/YOUR_USERNAME/cs464.git  
  ```

**replace with your own user name**

4. **Navigate to the new repository**
  ```bash
   cd cs464
  ```

## Step 4: Set Up the Upstream Repository

The Goal of this portion is to set an upstream to the class repository. This will allow you to fetch the changes as we make updates to the main branch.

1. **Add the original repository (this one) as a remote to keep your fork updated with the changes that we make**
  ```bash
   git remote add upstream https://github.com/danwhite-osucascades/cs464.git
  ```

2. **Fetch the latest changes**
  ```bash
     git pull upstream main
  ```