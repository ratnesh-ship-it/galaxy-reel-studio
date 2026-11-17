CREATE OR REPLACE FUNCTION public.audit_admin_registration()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$ DECLARE actor text; verb text; target text; BEGIN
SELECT email INTO actor FROM public.admin_users WHERE user_id=auth.uid();
IF actor IS NULL THEN RETURN coalesce(NEW,OLD); END IF;
verb:=lower(TG_OP);
IF TG_OP='UPDATE' THEN
  IF TG_TABLE_NAME='creator_registrations' THEN
    IF NEW.is_visible IS DISTINCT FROM OLD.is_visible THEN verb:=CASE WHEN NEW.is_visible THEN 'show' ELSE 'hide' END; END IF;
  END IF;
  target:=NEW.id::text;
ELSE
  target:=OLD.id::text;
END IF;
INSERT INTO public.admin_activity(admin_email,action,target_type,target_id) VALUES(actor,verb,TG_TABLE_NAME,target);
RETURN coalesce(NEW,OLD); END $function$;