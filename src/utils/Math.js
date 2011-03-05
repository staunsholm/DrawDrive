/**
 * Created by .
 * User: Mikkel Staunsholm
 * Date: 3/5/11
 * Time: 11:17 PM
 */

Math.linePointDist = function(st, b, pt)
{
    var nearestPt; //closest point on seqment to pt

    var keyDot = new THREE.Vector2().dot(b, new THREE.Vector2().sub(pt, st)); //key dot product
    var bLenSq = new THREE.Vector2().dot(b, b); //Segment length squared

    if (keyDot <= 0)  //pt is "behind" st, use st
    {
        nearestPt = st
    }
    else if (keyDot >= bLenSq) //pt is "past" end of segment, use end (notice we are saving twin sqrts here cuz)
    {
        nearestPt = new THREE.Vector2().add(st, b);
    }
    else //pt is inside segment, reuse keyDot and bLenSq to get percent of seqment to move in to find closest point
    {
        var keyDotToPctOfB = keyDot / bLenSq; //REM dot product comes squared
        var partOfB = new THREE.Vector2(b.x * keyDotToPctOfB, b.y * keyDotToPctOfB);
        nearestPt = new THREE.Vector2().add(st, partOfB);
    }

    var dist = (new THREE.Vector2().sub(pt, nearestPt)).length();

    return dist;
};