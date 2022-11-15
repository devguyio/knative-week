# Knative Apache Kafka installation

A to run Knative with Apache Kafka Source and Channel as default channels.

## Installer

Use the `00-installer*` scripts for either _minikube_ or _kind_.

## Knative Kafka pack:

The script gets you an installation, that runs:

* Apache Kafka test cluster, using [Strimzi](https://strimzi.io)
* Knative Serving CORE
* Kourier Ingress
* Knative Eventing (No `InMemoryChannel`)
* Knative Eventing components for Apache Kafka

The `KafkaChannel` is used as the default channel, including for the MT Knative Broker.

Run it:

```shell
./kn-eventing-kafka.sh
```

### Accessing a service

To extract the host & port for accessing a Knative service via Minikube you can use the following expression:

```
$(minikube ip):$(kubectl get svc kourier --namespace kourier-system --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')
```

For example:

```
# Get host:port for acessing a service
ADDR=$(minikube ip):$(kubectl get svc kourier --namespace kourier-system --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')

# Create a sample service
kn service create random --image rhuss/random:1.0

# Access the Knative service
curl -sH "Host: random.default.example.com" http://$ADDR | jq .
```

_`kn` is the official CLI from the Knative project. Get it [here](https://github.com/knative/client/releases/latest)!_

Have fun!
