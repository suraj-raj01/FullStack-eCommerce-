import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Auth() {
    return (
        <div className="flex items-center justify-center gap-2 p-10">
            <Button>
                <Link to='/auth/login'>Login</Link>
            </Button>
            <Button>
                <Link to='/auth/signup'>Register</Link>
            </Button>
        </div>
    )
}