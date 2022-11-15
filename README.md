# Demo Scenario

# Milestone I - GitHub Source

```
kubectl apply -f ms1
```
```
watch kubectl -n dev get pods
```
```
stern -n dev --json-pp github-message-dumper-00001-deployment -c user-container
```

# Milestone II - Extension Features (Channel)

```
kn func deploy
```

```
k delete -f ms1/300-github-source.yaml
```

```
kubectl apply -f ms2
```

```
stern -n dev --json-pp analyzer -c user-container
```

# Milestone III - Negative comments only!

```
k delete -f ms2
```

```
kubectl apply -f ms3
```

```
stern -n dev --json-pp mailer -c user-container
```