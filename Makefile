# // Knativ3weekmoderator

kn-install:
	sh config/kn-box/02-kn-eventing.sh
	sh config/kn-box/03-strimzi.sh
	sh config/kn-box/04-kn-kafka.sh
gh-source:
	kubectl apply -f config/github.yaml