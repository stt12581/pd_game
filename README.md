# Prisoner's Dilemma Game
There are two ways to run the prisoner's dilemma game with emotion recognition:
- install docker image then you don't need worry about frameworks and dependencies
- download github repos and install the dependencies

## Docker:
I put everything on a docker image (like a virtual machine) so that you don't need to worry about installing frameworks and dependencies. 

Here is a short documentation to get the image. It may take a while to pull the image to local, but other steps are fast.

1. Install docker. Go to: https://docs.docker.com/docker-for-mac/install/ and click "get docker for mac (stable)"

2. Open a terminal. 
~~~~
$ docker login
$ username: cherylshang
$ password: (it's a private repo)
$ docker pull cherylshang/pd_demo:version5
$ docker run -it -p 8000:8000 -p 3333:3333 cherylshang/pd_demo:version5
~~~~
Now you get a ubuntu14.04 image.

3. Run the script
$ ./run.sh
Then open the chrome on your laptop and enter "local:8000".  Here it is!!

4. Exit and re-enter
~~~~
$ exit  ->  stop the virtual machine and exit
$ docker ps -a -> list all the containers
$ docker start containerID -> start the machine
$ docker attach containerID  and type enter -> go to the machine's terminal
~~~~

## Github repos:
There are four parts in the prisoner's dilemma game:
1. PDBayes provides the game section with avatar frontend and bayesact backend (port 8000)
2. videoproc saves the images to local repo and cleans old images; runs as a manager to send new images to OpenFace and rnn to process; stores the EPA values and connects with PDBayes (port 3333)
3. OpenFace extracts features from given images. (port 8080) Note: I changed the original OpenFace project to extract the FHOG feature, and OpenFace can also do other processing tasks. If we want to only extract features, it's better to write a new OpenCV program from scratch to extract features in the future.
4. rnn predicts EPA values given features and outputs EPA values to the manager (port 8060)

You can download repos from here:
1. rnn + videoproc + script: https://github.com/stt12581/pd_game
Then cd pd_game folder and download the following repos:
2. OpenFace: https://github.com/stt12581/pd_game_openface 
3. PDBayes: Please contact me to get the first version in C. I only integrated the emotion recognition into this version. If you want the latest version, please contact other authors.

You need to install these before running the program:
- rnn: Keras (+Tensorflow)
- videoproc: nodejs (my version: v0.10.25) + npm (1.3.10) 
- OpenFace: libpca (search libpca 1.2 on github) + armadillo + opencv (https://github.com/TadasBaltrusaitis/OpenFace/wiki/Unix-Installation) Note: don't forget to make before running

### Run:
~~~~
$ cd PDBayes
$ make
~~~~
Note: The Makefile works for ubuntu/MacOS, but you may need to update the PATH.
~~~~
$ cd ..
$ ./run.sh
~~~~

If you encounter any problems or bugs please contact me by emailing me at cherylshang@gmail.com for any bug reports/questions.
