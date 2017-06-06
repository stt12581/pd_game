#!/bin/bash
trap 'kill %1; kill %2; kill %3; kill %4' SIGINT
(cd PDBayes && python3.4 pyserver.py) &
(cd videoproc && npm start) &
(cd rnn && python test.py) &
(cd OpenFace && bin/FeatureExtraction) &

wait
 
