# Investment Certificates Web site

## RUN
Use env var (secret) named `ICWEBSVC_SECRET` to store ICWEBSVC api key.
Use the Build command to chain the scripts together:
```bash 
inject_env_vars.sh && bundle exec jekyll build
```